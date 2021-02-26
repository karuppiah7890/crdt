# Grow Only Counter

I'm trying to implement a Grow Only Counter (G-Counter) which is a Convergent
Replicated Data Type (CvRDT) which translates to a state-based Conflict-free
Replicated Data Type (CRDT) which is different from op-based CRDT.

> A Counter is a replicated integer supporting operations increment and
> decrement to update it, and value to query it. The semantics should be is
> that the value converge towards the global number of increments minus the
> number of decrements. (Extension to operations for adding and subtracting an
> argument is straightforward.) A Counter CRDT is useful in many peer-to-peer
> applications, for instance counting the number of currently logged-in users.

I'm going to be implementing the counter in JavaScript and write tests later.
I'm going to be using classes and methods for ease of use and understanding

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions

I'm adding Jest framework for testing. The default environment for Jest tests is
a browser like environment using "jsdom" instead of "node". In the future, if
we need to support both node and browser environments, we gotta see how to do it
and how to support it. For now I'm leaving the default

https://jestjs.io/docs/en/configuration#testenvironment-string

```bash
$ yarn init
$ yarn add --dev jest
```

https://duckduckgo.com/?t=ffab&q=initialize+javascript+array+with+values&ia=web

https://stackoverflow.com/questions/4049847/ddg#28507704

---

Write test for constructor - check if array has been initialized with 0s by
using assertion on query method

Write down disadvantages of using arrays - need to know ID in terms of a
sequence. Instead UUID like IDs are easier to get for each replica using
something like memberlist library in Golang by Hashicorp. Write down about
networking based on this.

Downsides in using Grow Only Counter is that the number of replicas and the ID
of each replica needs to be known before hand. So, all replicas need to be
alive at first. I think one replica cannot come join in between. At least that's
how it looks like. Hmm. Let's see.

Also, for using UUIDs for replica ID or anything other than a sequence starting
from 0, it's good to use maps or hashmaps or hash, basically associative arrays
with keys as anything and not just a sequence of integers. Accordingly the
implementation of other methods will change but it's still feasible, no issues
because of choosing maps. Not sure what the research paper was trying to imply
though, but looks like it doesn't matter there. For them they said "myID" and
that's it. It never imposed any conditions on the replica ID or how the data
structure storing the replica ID and replica value information should be
implemented

---

In grow only counter, I think for program correctness - no replica should
change the value of another replica in the vector

How does Grow Only Counter work? Each replica maintains it's own counter, which
is kind of like a local state. For understanding the global state, the total
count, it needs the values of other replicas. So we have a vector to store it's
value and values of other replicas. They exchange information through a
network. But sometimes the information may come late, in a different order than
the causal history (timing of events or updates) etc. But it is assumed that
all the information is always communicated to all the replicas at some point.
With this in mind, every replica gets all the values and it can add them and
show the single value to show the count. What can go wrong? Since communication
can happen in such a way that sometimes old information may come in, for
example,

If replica ID is 0, at this replica, we have the value of 3 replicas. Total
replicas is 3.

0 | 1 | 2
5 | 20 | 80

Now the replica 0 gets a payload from the network which says

0 | 1 | 2
4 | 15 | 78

This is an old information. How do we know this? This is because, all the
values are old. In Grow Only Counter, the count only grows. So, what this means
is, given the current values we have, these are latest values as they are
bigger than what the payload says. So, it's a state or payload from the past.
Theoretically what is happening is, we have an always increasing value (grow
only counter) and the calculation we do is of a least upper bound, this way, we
understand old values and are able to avoid them at the data structure level
and not at network level. We allow the network to send in any order instead of
the causal order. But we expect the network to always send all the information
so that there is no loss of information.

Other thing to note is, I think it's better to always ignore the value in the
vector which corresponds to the current replica. For example, in replica 0,
when receiving payloads from the network, ignore the vector value corresponding
to replica 0. So, in the above case, however 4 will be ignored. I mean, it's
like, 0 is the owner of the value. Some other replica doesn't have to send
information to tell what's the value at that replica. So yeah. Ideally, the
owner will have the largest value or equal value when compared to the
corresponding values for the replica in the network payloads.

One thing about CRDTs is, in terms of coding, we can try to use private fields
yes. For example in Object Oriented Programming, in objects. But we need to
ensure that we can still serialize the object into JSON, XML, Protobuf and what
not when we want to send the information through a network. The information can
be anything present in the CRDT, maybe not all, or maybe all. It depends on the
kind of CRDT and it's implementation.

In Grow Only Counter, the network payload just needs to contain the vector and
nothing else. In each replica though, we also have replica ID during
initialization but looks like it's not needed during network payload.

Before the Grow Only Counter is started, they all need to connect to each other
and maybe decide things like their ID (it shouldn't clash ideally. It's an ID)
and then understand totally how many replicas and then maybe also exchange IDs.
This might be useful in a particular kind of implementation where we use maps
instead of arrays to store the vector information.

Questions:

- Is it possible to add new replicas in between? What does it mean? It means we
  need to grow the vector in each replica to have space to store value for this
  new replica, have a unique ID for this new replica and then that's it I guess,
  it can start communicating. Yeah?
- Why should the increment operation only increment by 1? It can increment by
  any number and looks like it will still work!!

---

Add test for merge commutative and associative behavior

Commutative -

1.

A.merge(B)
B.merge(A)

Both A and B have same value

2.

A.merge(B)
A.merge(C)

is the same as

A.merge(C)
A.merge(B)

Gotta see how to write this test. Hmm

Associative

1.

A.merge(B)
A.merge(C)

( A . B) . C

Is the same as

B.merge(C)
A.merge(B)

A . ( B . C )

Extra:

Currently merge doesn't return back the new state. According to the research
paper it should. In OOPS, we have not done that way. But we can return back the
same object (counter) for chaining operations :)

(A.merge(B)).merge(C)

A.merge(B.merge(C))

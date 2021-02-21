[GOAL]
"Understand everything there is to know about Collaboration Tools". Now that's
a broad topic. So, let's make it more specific for short term goals

[GOAL]
"Understand everything there is to know about coding collaboration tools". Now
that's also a broad topic. Let's narrow down for short term goals

[GOAL]
"Understand everything there is to know about text document collaboration tools"
Again, a bit broad, but consider writing code is nothing but writing text but
with extra things like suggestions, auto completion, highlighting and automatic
text addition, for eg: automatic addition of closing bracket when typing an
opening bracket, also there are a lot of coding tools behind the scenes that do
some work, for eg: linters, Language Server Protocol Servers, code
formatters and there could be more. Given text document collaboration is also
a broad topic, let's narrow it down a bit more. Also, text here means normal
text. Code is more of rich text at times - that is, it has highlighting etc, but
the rich features can be obtained differently too, but that's something to think
about for the long term. Rich text can also mean text with extra information
like bold, italics text, colored text, text with notes / comments, like Google
Docs. Something to be aware of. Maybe this kind of rich text collaboration may
not entirely be useful in terms of code collaboration but may come in handy for
text document collaboration like in the same field as Google Docs, and similar
online Document tools and services.

Let's narrow it down a bit more.

[GOAL]
"Understand everything there is to know about CRDT". CRDT is one technology when
it comes to collaborative editing. There are more similar or related
technologies too. Operational Transform (OT) is one such. Not sure about what
others are out there.

Given even CRDTs is a broad topic, let's narrow it down a bit more!

[GOAL]
"Understand everything there is to know about Sequence CRDTs". Sequence CRDTs
are apparently the thing we are looking for when it comes to collaborative
editing of text.

Sequence CRDTs is still a hard thing. There are also many Sequence CRDTs, we
have to tackle each one in a step by step fashion and learn it. It's a bit of a
hard thing to learn I think. Also, some Sequence CRDTs are new and some are very
old. Usually the new ones are an improvement from the old ones and also the new
ones take inspiration from the old ones but also improve things in some angle
like performance usually.

Also, Sequence CRDTs are a bit complex CRDTs. To understand the core concepts of
CRDTs, we have to start from step 1 and learn about CRDTs in general and about
simple CRDTs first.

From the Wikipedia page for CRDT
https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type

I noticed that they talk about a boolean CRDT first, which seems too simple but
it might be worth it to try it out ;) To create a skeleton structure for future
CRDTs.

The next step to learn a CRDT seems to be trying out and implementing some CRDTs
and also learning how they work and their pros and cons. Wikipedia mentions
G-Counter as the first CRDT. I'm assuming this is the simplest of all? Or maybe
not. The concept looks easy but implementation looks hard. Also, it's a
particular kind of CRDT called State based CRDTs which have it's own pros and
cons compared to Operation based CRDTs

So, the goal for now is

[GOAL]
"Understand everything there is to know about G-Counter CRDT"

To understand G-Counter CRDT, I must first understand some basics. Let me think
of some questions. Hmm.

- What is a CRDT?
- What are some related concepts similar to CRDT? I hear Operational Transforms
  is one such. Are there anything else?
- Looking at the wikipedia, there seems to be different types of CRDTs. In what
  kind of applications are people using these different types and why?
- Is the Wikipedia page a good enough resource to start with? I noticed
  https://crdt.tech/ and of course I noticed a lot of research papers. I think
  the oldest paper talking about CRDT seems to be some 2011 paper. Is that
  right? Looking at https://crdt.tech/resources , it looks like this paper is
  the one - "Marc Shapiro, Nuno Preguiça, Carlos Baquero, and Marek Zawirski: A
  comprehensive study of Convergent and Commutative Replicated Data Types.
  INRIA Research Report 7506, Jan. 2011.". Should we read that first? Or should
  we read this one first "Nuno Preguiça: Conflict-free Replicated Data Types:
  An Overview. arXiv:1806.10254, June 2018.".
- There seem to be some mathematical concepts and maybe proofs to understand why
  CRDTs work. Should I read them?

I might have to see if the above questions really lead me to understanding
G-Counter CRDT better. Or else I can park it for later. Hmm

After understanding some basics, I can learn more by implementing and learning
on the go. I plan to start by implementing G-Counter CRDT. What are the goals
for the implementation?

I want to try to implement in Js - so that it works on NodeJs and Browser. But
we can start by running in Browser. Why? So that anyone can easily load a web
page and run it. They won't have to use local machine NodeJs environment or
even run some piece of code in some NodeJs online environment and I won't have
to deploy any web app with NodeJs backend so that the web app can show what the
NodeJs backend is doing behind the scenes. I want a static web page as much as
possible and everything to work in it! :)

- CRDT is apparently only a data structure? Yes?
- Apparently it's sometimes closely related to the networking? Or sometimes
  relies on the networking? For example correctness of the networking in case of
  operation based CRDTs where the operation must be sent to other peers only
  once or it will look like two operations
- Operation based CRDTs surely need network that help to send each operation or
  message exactly once? Are state based CRDTs better in that way? Like, they
  don't have to be sent exactly once? It's okay to send state based CRDTs more
  than once?

I want to build a CRDT that is independent of the networking as much as
possible. It's okay if the CRDT requires that the network work in such a way,
like send message / data to peers exactly once, no more, no less. If I build a
CRDT independent of the network, which is ideal, as CRDTs are only data
structures, then I can easily plug and play with any network that can satisfy
the networking requirements of the CRDT

Given in the long term the goal is to be able to work with code, should I also
worry about keeping it related to code? Not now, but when we hit sequence CRDTs?
Hmm, maybe, or maybe not. For now, let's keep CRDTs just aware of their own
logic and nothing else. We can use pluggable modules in between to adapt to
different use cases :) Let's keep CRDTs as CRDTs - just data structures and
nothing else. They just need to do the operations they are told to do, which
are already defined for their data structure.

In the future, we can write other modules to interface between the code editor
and the CRDT. And we need to be able to use any code editor. So, we need good
modules that interface well with the CRDT and also good CRDTs that can support
the needs of code editor level editing - depending on the code editor, so that
it's easier to bring in collaborative editing.

Anyways, we have drifted out a lot. Let's get back on track. G-Counter and the
basics needed for it!

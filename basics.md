# Basics

What's a CRDT?

Wikipedia has a good explanation
https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type

Where can it be used?

It can be used for Collaborative Editing in Collaborative Editors
https://en.wikipedia.org/wiki/Collaborative_real-time_editor
One example is Atom text editor's Atom Teletype feature. There are many more
such Open Source tools and features. And possibly closed source tools and
services use CRDTs too, but we can't say for sure as we don't have access to
their code as it's closed source.

Since it's conflict free, there won't be edit conflicts I think
https://en.wikipedia.org/wiki/Edit_conflict

---

There's a concept called Optimistic Replication
https://en.wikipedia.org/wiki/Optimistic_replication . Wikipedia has a good
explanation.

Eventual Consistency
https://en.wikipedia.org/wiki/Eventual_consistency

Lamport Timestamp
https://en.wikipedia.org/wiki/Lamport_timestamp

Vector Clock
https://en.wikipedia.org/wiki/Vector_clock

---

https://duckduckgo.com/?q=crdt+grow+only+counter+research+paper&t=ffab&ia=web

http://db.cs.berkeley.edu/cs286/papers/crdt-tr2011.pdf

https://blog.acolyer.org/2015/03/18/a-comprehensive-study-of-convergent-and-commutative-replicated-data-types/

https://blog.acolyer.org/2015/08/17/lasp-a-language-for-distributed-coordination-free-programming/

https://blog.acolyer.org/2016/04/25/delta-state-replicated-data-types/

https://blog.acolyer.org/2019/03/11/efficient-synchronisation-of-state-based-crdts/

https://blog.acolyer.org/2019/11/25/mergeable-replicated-data-types-part-i/ ?

https://blog.acolyer.org/search/?q=CRDT

https://blog.acolyer.org/2015/08/10/eventually-consistent-transactions/ ?

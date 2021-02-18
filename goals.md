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
ones take inspiration from the old ones but also improve things in  some angle
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



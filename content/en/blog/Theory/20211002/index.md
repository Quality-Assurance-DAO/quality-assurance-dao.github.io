---
date: 2021-10-02
title: "Notes on Lambda Calculus"
linkTitle: "Notes on Lambda Calculus"
description: "Notes on Lambda Calculus"
author: Stephen Whitenstall
resources:
- src: "**.{png,jpg}"
  title: "Image #:counter"
  params:
    byline: "Notes on Lambda Calculus"
---

{{< imgproc Lambda_calculus-Church_numerals Fill "459x196" >}} Church encoding of the natural numbers in lambda calculus{{< /imgproc >}}

### Passive-Interface-Pair-for-Decentralized-Identity-DID

In response to Marta's (N+Fold) discussion on *[Comparing Interoperability when there is a transliteration of material forms.](https://github.com/NFold/Passive-Interface-Pair-for-Decentralized-Identity-DID/wiki/Comparing-Interoperability-when-there-is-a--transliteration-of-material-forms.)* in relation to her Project Catalyst Fund 6 proposal *Passive-Interface-Pair-for-Decentralized-Identity-DID* I touched upon the subject of Lambda Calculus :

> It was an interesting session. With reference to your wiki notes: yes "Laws of Form" looks like it has parallels with Lambda Calculus. The name I was searching for on Saturday was Alonzo Church who collaborated with Alan Turing on computability. And Church's Lambda Calculus came to mind, in relation to your proposal, because it is an analogue means of computation (written notation) and a way to test what is computable without a digital computer. Another aspect of Lambda Calculus is its sparseness - at its core it is a non-extensional theory of functions. So it does not rely on external references to ordered pairs of data. Lambda functions are unary and immutable. A passive interface with an immutable history if it is computable would be a Turing machine and a possible reader/writer could be Lambda functions. 
 [Discord link](https://discord.com/channels/756943420660121600/875490941589422140/886757403490660373)
 
 ### Mapping Multiple Traces of Immutability. Why?
 
 This comment was discussed further in an After Town Hall session hosted by Marta on 22nd September 2021 entitled “*Mapping Multiple Traces of Immutability. Why?*" and [recorded on YouTube](https://www.youtube.com/watch?v=EpZGPf9r_Hg”).
  
### Lack of extension

A succent explanantion of the intensional nature of Lambda Calculus is given by Peter Selinger in his *[Lecture Notes on the Lambda Calculus](http://www.mscs.dal.ca/~selinger/papers/#lambdanotes)* .

> Think of a computer program as defining a function that maps onput to output. Most computer programmers (and users) do not only care about the extensional behavior of a program (which inputs are mapped to which outputs), but also about how the output is calculated: How much time does it take? How much memory and disk space is used in the process? How much communication bandwidth is used? These are intensional questions having to do with the particular way in which a function was defined.

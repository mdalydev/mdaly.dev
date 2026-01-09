---
title: Home Lab Intro
date: 1/8/2026
description: This post will go through my upcoming home lab project (what, why, challenges, with what, how)
---
## Overview

What? 
- Project description
- ...
Why?
- Experience
- Service Benefit
- ...
Challenges
- Family preferences
- Data transmission
- Price
With What? (Exciting part)
- Main Server
- Networking
- ...
How?
- Network Map + Explanation
- Connections

## What? 

This project is a self directed home lab. This means I am going to attempt to a personal, self contained IT environment for learning, experimenting and testing software I may use professionally. The initial stages of this will consist of more basic configurations however, as I move along I hope to incorporate denser topics. (If you're familiar with a home lab feel free to skip to "why?" section)

For someone less involved in this topic, I am going to try my best to create similar functionality as a full network stack that could be present in a business. So, often times in those environments they have different architectures, however when services are based on "prem" premises the IT team will have multiple server racks. These racks typically have two types of purpose, compute or network. With compute the goal is to host services, create, or share things. However, with networking racks the goal is to effective route communication. So, some of the services typically found within an enterprise environment would be, 

Identity & Access Management (IAM), controlling accounts and the groups those accounts belong to, password policies, and more. 

They could also control segmentation, this is a networking concept where certain Virtual Local Area Networks (VLANs) or similarly explained as channels of communication are created and then separated from each other so the network is harder to traverse for an attack, as well as easier to manage for an IT member. I think of segmentation as TSA through the airport, if everyone was able to go through a large gate to all the flights they may all be entering from the same place however, you have very little control over how they interact with each other, keeping track of numbers (number of people, how much luggage, etc.) and importantly identifying the ones who shouldn't be there. So segmentation gives identification, control, and isolates traffic streams so different security levels can be maintained. This is considered logical segmentation (using switch & routing logic to control the flow of information) however, the most important information such as a camera network, can be "Air Gapped" which means it is completely separated. This means if a switch becomes compromised there is still no chance of exposure because the sensitive system / information isn't touching it in any way.

Firewalls are another crucial service when it comes to enterprise environments. They are so important because of the rules they enforce. These rules are typically allow and deny.. pretty simple? Possibly, however these rules allow deep configuration, Allow traffic from this location at this time of day to this service, Deny SSH (Port 22) traffic from this specific internal VLAN to this other one.. Since I'm doing analogies I think of this like a filter in a drinking water system. You have the fiber filter that cleans out most larger particles, then the membrane filter that filters the smaller particles and then finally the chemical filter that purifies the water so it is perfectly safe to drink (To learn more about filters please press [here.](reverseosmosis.md) Firewalls work in a similar way where they stop certain traffic to filter to the very specific, restricted, permitted traffic.

 Next is server infrastructure, which is a large part of my upcoming lab. In an enterprise environment they may be hosting quite a few servers. This could include a web server, a local file share, a communication platform or a printing service.  These are often done using virtualization which is just a computer having multiple computers (Operating Systems) on it. The purpose of this is essentially efficiency. 

## Why?

I am a recently graduated cybersecurity student as of 12/17/2025 and a home lab has been something I've really wanted to do for awhile. It would offer significant experience in just the setup process (Sourcing, choosing best parts, coming up with lab ideas) however, the goal is to be able to learn different topics long term. That is also the goal behind the blog, to offer a platform to share my findings as well as learn more myself since teaching is a form of learning itself.

It would also offer significant service benefit. I don't currently have the services nailed down, however it will be able to do ad blocking, backups and a remote VPN as well. However, these are only initial ideas and more cool stuff will come to me with time + inspiration.

More!

## Challenges

First, I want to mention these challenges are actually something I'm glad to have, if my lab setup was without challenges then I wouldn't be working on the skill of managing tradeoffs and stakeholder preference.

Now, I want to mention my family's preferences. Due to the work that is done within my house uptime can't be affected. Of course, I don't want to influence uptime negatively but I'm still in training so its bound to happen. So here is a diagram that currently represents my home network infrastructure as of 1/8/2026

[Beautifully drawn home network layout](blog/images/hnbefore.pdf)
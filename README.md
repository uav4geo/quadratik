# Quadratik

Free and open source software for easy self-hosted quadratic funding.

![image](https://user-images.githubusercontent.com/1951843/83590715-5f083300-a524-11ea-84eb-5b0e1386d73c.png)

## What is quadratic funding

tldr; it's not economically advantageous for people to directly fund open-source software. We make it advantageous by combining each pledge with additional funds from a sponsor pool. The additional funds optimally compensate for the value a pledge benefits other users.
Example: if Bob makes a contribution ($25) for something that could be valuable to Alice, Bob needs to be compensated for the additional benefit that Alice gets ($25). So Bob's pledge needs to be worth $50. More pledges lead to more overall value for everyone involved, making it economically advantageous for both Bob and Alice to pledge.

### The problem

Raising funds for public goods (e.g. open source software) [is difficult](https://www.investopedia.com/terms/t/tragedy-of-the-commons.asp):

> Every individual has an incentive to consume a [public] resource at the expense of every other individual with no way to exclude anyone from consuming. It results in overconsumption, under investment, and ultimately depletion of the resource.

In software, although making copies of a software is virtually cost-free, the time contributors spend on an open-source project is finite. Any successful open-source project will often run out of developer time, unless the project finds a way to grow in a sustainable manner.

Growth is often achieved by relying on large entities sponsoring for developers' time and/or relying on the efforts of individual volunteers. This is less than ideal because it places the sponsors in a position of too much power, reduces the ability of the community to steer the project and places unfair burden on the volunteers with unpaid work.

Existing fundraising systems (eg. Indiegogo, Patreon and others) work as "pre-sale" or "exclusive access" platforms (backers usually receive certain exclusive benefits for their pledges). These platforms have accomplished some successes, but don't address the economic disincentive of people contributing to a common good. They also often rely on exclusive transfers of value between backers and content creators, which might be incompatible with the open-source philosophy of sharing.

### Quadratic funding

When a fund is started, we designate a pool sponsor for the fund. The pool sponsor can be either the developer itself or an organization that has the financial resources to act as a sponsor. The purpose of the pool sponsor is to compensate for the additional value that a pledge from one user generates for everyone else.

Every time a pledge is made from a community user, the system takes the square root of each pledge, sums them up and squares the result (thus the term quadratic):

![image](https://user-images.githubusercontent.com/1951843/83590932-d047e600-a524-11ea-93b2-8ea13de26946.png)

You can prove mathematically that this subsidy optimally compensates for the value that Bob and Alice place into the fund, considering that Bob's pledge increases the value of Alice's and vice-versa.

It follows that more pledges lead to more overall value. **The subsidy pool makes it economically advantageous for both Bob and Alice to pledge.**

Examples:
 - Two people each pledging $25 (overall value: $100) bring twice as many funds than a single person pledging $50 (overall value: $50).
 - Eight people each pledging $25 (overall value: $1600) bring four times as many funds than two people each pledging $100 (overall value: $400).

### References

- [Buterin, V. (2019, December 07). Quadratic Payments: A Primer.](https://vitalik.ca/general/2019/12/07/quadratic.html)

## Installation

You will need to install:
 * [NodeJS](https://nodejs.org/en/)
 
Extract the source code in a directory, then from the directory:

```bash
npm install
npm install -g webpack webpack-cli
webpack
node index.js
```

TODO: [Onboarding Setup](https://github.com/uav4geo/quadratik/issues/8). Currently you need to open the sqlite3 database using [DB Browser for SQLite](https://sqlitebrowser.org/) in `data/sqlite3.db` and create 5 rows in the `config` table:

![image](https://user-images.githubusercontent.com/1951843/83591193-611ec180-a525-11ea-8bc7-c615d14ac9b7.png)

As well as entries for each `fund`.

You will need to create an account with [Stripe](https://stripe.com) to accept payments and setup the `secret` and `publishable` API keys.

The application should be available from your browser at http://localhost:3000.

## Contributing

We welcome contributions! If you want to add something, please open a pull request.

## Reporting Issues

Please [open an issue](https://github.com/uav4geo/quadratik/issues) if you find a problem with the software.

## FAQ

### How does a pool sponsor predict how much they'll end up being committed to paying?

You can use the formula:

```python
import math
funding_goal = 4800
minimum_pledge_per_user = 10
max_sponsor_contribution = funding_goal - math.floor(1/2*(minimum_pledge_per_user + math.sqrt(4*funding_goal*minimum_pledge_per_user + minimum_pledge_per_user^2))/minimum_pledge_per_user) * minimum_pledge_per_user # --> 4580
```

This is in the unlikely event that everyone pitches in the minimum pledge amount.




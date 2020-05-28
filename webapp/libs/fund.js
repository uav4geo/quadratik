const FundingTypes = {
    1: {
        label: "All or Nothing",
        description: "If we don't reach the funding goal within the designated timeline, the developer won't receive any of the funds that were pledged and people will not be charged."
    }
};

class Fund{
    constructor(fundJson){
        Object.assign(this, fundJson);
        console.log(fundJson);
    }

    typeLabel(){
        return FundingTypes[this.type].label;
    }

    typeDescription(){
        return FundingTypes[this.type].description;
    }

    communityFundAmount(){
        return Math.round(this.pledges.reduce((acc, p) => acc += p.amount, 0));
    }

    poolFundAmount(){
        const sumOfSqrt = this.pledges.reduce((acc, p) => acc += Math.sqrt(p.amount), 0);
        const sumOfSqrt2 = sumOfSqrt * sumOfSqrt;
        return Math.round(sumOfSqrt2 - this.communityFundAmount());
    }

    totalFundAmount(){
        return this.communityFundAmount() + this.poolFundAmount();
    }

    percentageFunded(){
        const total = this.totalFundAmount();
        
        return Math.round(total / this.goal * 100.0);
    }

    timesup(){
        const now = new Date().getTime();
        return new Date(this.expires) - now < 0;
    }

    fundingGoalAchieved(){
        return this.totalFundAmount() >= this.goal;
    }
}

export default Fund;
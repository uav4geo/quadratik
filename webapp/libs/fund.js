const FundingTypes = {
    1: {
        label: "All or Nothing",
        description: "If we don't reach the funding goal within the designated timeline, the developer won't receive any of the funds that are pledged and people will not be charged."
    }
};

class Fund{
    constructor(fundJson){
        Object.assign(this, fundJson);
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

    poolFundAmountIf(newUsers, pledgeAmount){
        const sumOfSqrt = this.pledges.reduce((acc, p) => acc += Math.sqrt(p.amount), 0) +
                          Math.sqrt(pledgeAmount) * newUsers;
        const sumOfSqrt2 = sumOfSqrt * sumOfSqrt;
        return Math.round(sumOfSqrt2 - (this.communityFundAmount() + (newUsers * pledgeAmount)));
    }

    totalFundAmount(){
        return this.communityFundAmount() + this.poolFundAmount();
    }

    percentageFunded(){
        const total = this.totalFundAmount();
        
        return Math.round(total / this.goal * 100.0);
    }

    timesup(){
        if (!this.expires) return false;
        
        const now = new Date().getTime();
        return new Date(this.expires) - now < 0;
    }

    fundingGoalAchieved(){
        return this.totalFundAmount() >= this.goal;
    }

    getCountdown(){
        if (!this.expires) return "No time limit";
        if (this.timesup()) return "-";
    
        // Get today's date and time
        const now = new Date().getTime();
    
        // Find the distance between now and the count down date
        const distance = new Date(this.expires) - now;
    
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

export default Fund;
interface Results { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Rating { 
    rating: number,
    ratingDescription: string
}

const getRating = (target: number, average: number): Rating => {
    if (average > target ) {
        return {
            rating: 3,
            ratingDescription: "amazing"
        };
    } else if (average === target) {
        return {
            rating: 2,
            ratingDescription: "good"
        };
    }
    return {
        rating: 1,
        ratingDescription: "not good"
    };
};

export const calculateExercises = (dailyExercises: Array<number>): Results =>  {
    const target: number = dailyExercises[0];
    const average: number = (dailyExercises.reduce(function(a, b) { return a + b; }, 0) / dailyExercises.length);
    const periodLength: number = dailyExercises.length -1;
    const trainingDays: number = dailyExercises.filter(x => x > 0).length -1;
    const success: boolean = (average > target) ? true : false;
    const { rating, ratingDescription } = getRating(target, average);
    return {
         periodLength,
         trainingDays,
         success,
         rating,
         ratingDescription,
         target,
         average
    };
};

  
const parseArguments = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const dailyExercises: Array<number> = [];
    for (let i = 2; i < args.length; i++) {
        const num = Number(args[i]);
        if(isNaN(num)) {
            throw new Error('Wrong types of arguments');
        }
        dailyExercises.push(num);
    }
    console.log(dailyExercises);
    return dailyExercises;
};
  
  try {
    const dailyExercises = parseArguments(process.argv);
    console.log(calculateExercises(dailyExercises));
  } catch (e) {
    console.log('Error, something bad happened, message: ');
  }
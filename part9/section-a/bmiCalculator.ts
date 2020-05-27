interface Stats { 
    height: number,
    weight: number
}

export const calculateBmi = (height: number, weight: number): string =>  {
    const bmi: number = weight/(height/100*height/100);
    if(bmi > 25) {
        return "Overweight";
    }
    return "Normal (healthy weight)";
};

const parseArguments = (args: Array<string>): Stats => {
    if (args.length !== 4) throw new Error('Not enough arguments');
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Wrong types of arguments');
    }
    return {
        height,
        weight
    };
};

  try {
    const {height, weight} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e)
   {
    console.log('Error, something bad happened');
  }
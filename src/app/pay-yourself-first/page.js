import PayYourselfFirst from "./PayYourselfFirst";
export const metadata = {
  title: "A calculator to help you save on expenses – Old Mutual",
  description:
    "Our Pay Yourself First calculator will guide you towards saving money on daily and monthly expenses such as food, energy, fuel and entertainment.",
  alternates: {
    canonical: `https://oldmutualeducationtools.co.za/pay-yourself-first/`,
  },
};
const Calculator = () => {
  return <PayYourselfFirst />;
};

export default Calculator;

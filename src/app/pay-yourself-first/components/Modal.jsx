import Close from "/public/images/close.svg";
import ModalLeft from "/public/images/modal-left.svg";
import ModalRight from "/public/images/modal-right.svg";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed w-screen h-screen bg-[#101010] bg-opacity-75 z-20 top-0 lef-0 overflow-x-hidden overflow-y-auto font-montserrat">
      <div className="bg-white relative top-[20vh] w-3/4 mx-auto z-30 mb-[10%]">
        <button
          onClick={onClose}
          className="absolute -top-8 -right-8 z-30 cursor-pointer"
        >
          <img className="w-[23px] h-[23px] " src={Close.src} alt="close" />
        </button>
        <img className="absolute  right-0 w-[130px]" src={ModalRight.src} alt="" />
        <div className="px-32 pt-28 pb-10">
          <h2 className="text-brandGreen text-5xl font-light mb-10 ">
            User Guide
          </h2>
          <p className="text-2xl text-grey">
            How to calculate your FOOD, ENERGY and FUEL savings:{" "}
          </p>
          <ul className="list-disc list-outside text-xl text-grey mt-5 font-light pl-5">
            <li className="pb-2">
              Enter the estimated amount you spend each month.
            </li>
            <li className="pb-2">
              Select the two most appropriate tips to start your savings.
            </li>
            <li>
              Move the slider to indicate how much you can save with each tip as
              a percentage of the estimated spend amount.<br />
			  Please note: Although it is possible to reach the full savings, it takes extreme discipline, be realistic with what you think you can achieve.
            </li>
          </ul>
          <p className="text-xl text-grey mt-10 font-light mb-10">
            <span className="font-bold">Example:</span> Save up to 25% on
            groceries by switching to a more affordable brand. You can save
            anything between 0% and 25%. Move the slider to indicate your
            potential savings.
          </p>
          <p className="text-2xl text-grey">
            How to calculate your ENTERTAINMENT savings:{" "}
          </p>
          <ul className="list-disc list-outside text-xl text-grey mt-5 font-light pl-5">
            <li className="pb-2">
              Enter the estimated amount you spend each month.
            </li>
            <li className="pb-2">
              Select the two most appropriate tips to start your savings.
            </li>
            <li>
              Move the slider to indicate how much you can save as a percentage
              of the estimated spend amount. In the fourth tip, enter specific
              expense information, such as &apos;5&apos; on-the-go lunches.
            </li>
          </ul>
          <p className="text-2xl text-grey mt-10 mb-5">RESULTS:</p>
          <p className="text-xl font-light text-grey mb-5">
            Once you completed two tips in all the categories, the tool will
            calculate the total amount that you can save monthly. Select a
            savings goal and how long you want to save. The tool will give you a
            total expected return on your investment over the investment term
            that you chose. You also have the option to adjust your monthly
            savings if you don&apos;t want to save the full amount. It will then
            generate a report that you can use to track your savings.
          </p>
        </div>
        <img className="absolute bottom-20 left-0 w-[80px]" src={ModalLeft.src} alt="" />
      </div>
    </div>
  );
};
export default Modal;

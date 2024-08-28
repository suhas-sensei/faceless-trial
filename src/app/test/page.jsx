export default function Payment() {
    return (
      <>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-40 mt-40 rounded animate-fade-in-slow"
        >
          <a href="https://www.paypal.com/us/home">Pay with PayPal</a>
        </button>
        <div class="h-8 w-80 bg-blue-600 transition-opacity ease-in duration-700 opacity-100 hover:opacity-0">bam bam</div>
        <div class="bg-indigo-100 text-indigo-600 text-base w-40 h-36 font-medium flex items-center justify-center text-center animate-fade">fadeIn</div>
        <div class="bg-indigo-100 text-indigo-600 text-base w-40 h-36 font-medium flex items-center justify-center text-center hover:animate-fadeInLeft">fadeInLeft</div>


      </>
    );
  }
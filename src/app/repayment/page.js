"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const LoanRepayment = () => {
  const [formData, setFormData] = useState({
    userId: "",
    amount: ""
  });
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch(`/api/addRepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: formData.userId,
        Amount: formData.amount,
      }),
    });
    const res2 = await res.json();
    // console.log(res2);
    
    if (res2.error) {
      toast.error(res2.error);
    } else {
      toast.success(res2.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
            
              
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Paid 
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                it's time to pay your loan
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Loan-Id
                    </label>
                    <input
                      value={formData.userId}
                      onChange={(e) =>
                        setFormData({ ...formData, userId: e.target.value })
                      }
                      type="text"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Amount
                    </label>
                    <input
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      type="text"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                

                <div className="p-2 w-full">
                  <button
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    type="submit"
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default LoanRepayment;

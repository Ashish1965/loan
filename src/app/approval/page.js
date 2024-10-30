"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Getapproval = () => {
  const [formData, setFormData] = useState({
    userId: "",
  });
  const [approve , setApprove] = useState(false)
  const [reject , setReject] = useState(false)
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch(`/api/approvelLoan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: formData.userId,
      }),
    });
    const data = await res.json();
      

      if (data.error) {
        toast.error(data.error);
        setReject(!reject);
      } else {
        toast.success(data.message);
        setApprove(!approve);
        setFormData({
          userId: "",
        });
      }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
            {approve && (
                <div
                  className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                  role="alert"
                >
                  <p className="font-bold">
                    Congratulation Your loan request is approved.
                  </p>
                </div>
              )}
            {reject && (
                <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p class="font-bold">Sorry Your loan request has been rejected.</p>
               
              </div>
              )}
              
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Approval 
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Check Your loan's Approval State
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

export default Getapproval;

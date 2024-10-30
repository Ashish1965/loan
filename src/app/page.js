"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Loanrequest = () => {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    createdDate: "",
  });
  const [mess, setMess] = useState(false);
  const [id, setId] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData.userId , formData.amount , formData.term , formData.createdDate);

    try {
      const res = await fetch(`/api/loanRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Amount: formData.amount,
          Term: formData.term,
          CreatedDate: formData.createdDate,
        }),
      });

      // Check if the response is OK (status in the range 200-299)
      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }

      const data = await res.json();
      if (data.message && data.id) {
        setMess(!mess);
        setId(data.id);
      }

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setFormData({
          amount: "",
          term: "",
          createdDate: "",
        });
      }

      // Optionally, handle success (e.g., update the UI, show a success message)
    } catch (error) {
      // console.error("Error submitting loan request:", error);
      // Optionally, handle error (e.g., show an error message to the user)
      toast.error("Internal Error");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              {mess && (
                <div
                  className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                  role="alert"
                >
                  <p className="font-bold">
                    Now You can check your loan approval . And Your Loan-id :{" "}
                  </p>
                  <p className="text-sm">{id}</p>
                </div>
              )}
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Loan Request
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Make your first step toward loan
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
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
                      id="name"
                      name="name"
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
                      Term
                    </label>
                    <input
                      value={formData.term}
                      onChange={(e) =>
                        setFormData({ ...formData, term: e.target.value })
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
                      Current Date
                    </label>
                    <input
                      value={formData.createdDate}
                      placeholder="DD/MM/YYYY"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          createdDate: e.target.value,
                        })
                      }
                      type="Date"
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
                    Request
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

export default Loanrequest;

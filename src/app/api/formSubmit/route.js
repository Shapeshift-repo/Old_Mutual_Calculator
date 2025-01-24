import { name } from "file-loader";
import next from "next";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (request.method === "POST") {
    const { formData } = await request.json();
    // return NextResponse.json(formData);
    // return NextResponse.json(formData.phone);
    // const requestBody = {
    //   pageURL: "https://www.oldmutualretirementtools.co.za",
    //   source: "OMCOZA",
    //   googleAnalyticsId: "G-H2MLQMKQ3T",
    //   formData: {
    //     firstName: formData.name,
    //     surname: formData.surname,
    //     phoneNumber: formData.phone,
    //     comment: "Call me back form submission",
    //     sourceProduct: "Retirement Landing Page 2025",
    //     postalCode: formData.postalCode,
    //   },
    // };
    const customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");
    customHeaders.append(
      "X-Gravitee-Api-Key",
      "65ee2bd9-0dbe-4a70-8b40-0b8834cd41ad"
    );
    customHeaders.append(
      "Cookie",
      "__cf_bm=bqNzWS06L7uNggJOTBhBCblL.6Lm4j9.Gx7c8YCZ3uk-1710331731-1.0.1.1-rQHoW9PV_9UZk5g_rVS1lVkJB72JyWsUTRHWLiwOCaaeL2ElDm.PU8ZfLoQGjVpqNtbtQagzJRMLRh0_PYt_Gw; __cf_bm=2mZ5ffGqFJ.kpVmoS42VqEYHGM6d3l5X2u0SX4fWeEU-1730295172-1.0.1.1-CTkJKSJktwP8qQU4TazEhtf3uEWWPAqF_1dioyMZn.l5TTRF3T0wRFiDdhEPwi9sADysW.JCOmgPITWwa2h_hw; __cf_bm=7AZV1.kbslzDUd7QcZQSI_k039YhBeMHqwf4Pt9jDXc-1734600697-1.0.1.1-kc6l6oEUGrTQZtGC.Mg5Pv2NzVoJthLZyLPcKPeK3qOo6EMCiO0uxnmuremNZJN5uLRs6c1lc7BzIttkBUWCwg; __cf_bm=TrEHgMgHAfrx89TYhGBnGu0ZRAhg02_qQIT8_svHl7g-1736490801-1.0.1.1-.6xc4tS4nuclM3hUEXb2DubVW4qcyxOQ5CNcqp8S0OQmvHNpyNTRWRkFYh7gXVi46q3EeIl6ZZSjT5Lfl83cMA; __cf_bm=doeeCncvqZ83bec0CNbnP7hgpRZeIzI.fRen2YvCEk0-1736502591-1.0.1.1-Z1vmP2AKoz5dySyVn9KD0DsFP2QgjF7UL5XtQvFUMb92b3vre_bO.OdrZz30MQjiXHeKrBVYPhdIWl8h_VAhkg; __cf_bm=_OB0YJJJQSkrqxbv3grNH2WH_5YL8olkey8vFTddALM-1737633801-1.0.1.1-RFEwxoPhM23do3PXW1VPGWdFntKx7uutzizaTdrtjRg7ZdKly_XXuitGZjhPrqLVAgsqd7Mu7LKcUtoiYHzVmg"
    );

    const raw = JSON.stringify({
      pageURL: "https://www.oldmutualretirementtools.co.za",
      source: "MyOldMutualPublicWebsite",
      googleAnalyticsId: "G-H2MLQMKQ3T",
      formData: {
        name: "Retirement-Tools",
        firstName: formData.firstName,
        surname: formData.surname,
        phoneNumber: formData.phoneNumber,
        comment: "Call me back form submission",
        sourceProduct: "Retirement Landing Page 2025",
        postalCode: formData.postalCode,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: customHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://momapi.digital.oldmutual.co.za/gateway/leadscapture/chatbot/lead",
        requestOptions
      );

      const result = await response.text();
      return NextResponse.json({
        message: "Form submitted",
        result,
      });
    } catch (response) {
      return NextResponse.json(
        { message: "Error submitting form", error: error.message },
        { status: 500 }
      );
    }
  }
}

import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [showCalendlyIframe, setShowCalendlyIframe] = useState(false);
  const [googleCalendarEmail, setGoogleCalendarEmail] = useState("");
  const [showGoogleCalendarIframe, setShowGoogleCalendarIframe] =
    useState(false);
  const [copyPageUrlButtonName, setCopyPageUrlButtonName] = useState(
    "Copy this page URL!",
  );

  useEffect(() => {
    console.log("useeffect");
    const urlParams = new URLSearchParams(window.location.search);
    const cdly = urlParams.get("cdly");
    const gcal = urlParams.get("gcal");
    setCalendlyUrl(cdly ? `https://calendly.com/${cdly}` : "");
    setGoogleCalendarEmail(gcal ? gcal : "");
    setShowCalendlyIframe(!!cdly);
    setShowGoogleCalendarIframe(!!gcal);
  }, []);

  // share same button handler for both sides -- probably not a good idea
  function submitButtonHandler() {
    console.log("submitButtonHandler");
    const stateParts: string[] = [];

    if (calendlyUrl) {
      setShowCalendlyIframe(true);
      stateParts.push(
        `cdly=${encodeURIComponent(
          calendlyUrl.replace(/^https:\/\/calendly.com\//, ""),
        )}`,
      );
    }
    if (googleCalendarEmail) {
      setShowGoogleCalendarIframe(true);
      stateParts.push(`gcal=${encodeURIComponent(googleCalendarEmail)}`);
    }

    const pageUrl = `?${stateParts.join("&")}`; // ?cdly=...&gcal=...
    window.history.replaceState({}, "", pageUrl);
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <div className="flex h-full">
          {showCalendlyIframe ? (
            <iframe
              title="calendly"
              src={calendlyUrl}
              className="w-1/2 h-full"
            ></iframe>
          ) : (
            <div className="w-1/2 h-full"></div>
          )}
          {showGoogleCalendarIframe && (
            <iframe
              title="google-calendar"
              src={`https://calendar.google.com/calendar/embed?src=${googleCalendarEmail}`}
              className="w-1/2 h-full"
            ></iframe>
          )}
        </div>
        {(!showCalendlyIframe || !showGoogleCalendarIframe) && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 backdrop-blur-md"></div>
        )}
      </div>
      {!showCalendlyIframe || !showGoogleCalendarIframe ? (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 p-8 bg-white rounded-lg shadow-lg z-10 max-w-xl w-full">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Fastlendly
          </h2>
          <p className="my-2 text-center text-sm text-gray-600">
            See a Calendly page side-by-side with Google Calendar
          </p>
          {!showCalendlyIframe && !showGoogleCalendarIframe && (
            <p className="my-2 text-center text-sm text-gray-600">
              <b>Fill either one (or both) of the fields below</b>
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!showCalendlyIframe ? (
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="calendly-url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calendly URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border border-black px-2 py-1 mr-3"
                    placeholder="https://calendly.com/..."
                    value={calendlyUrl}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        submitButtonHandler();
                      }
                    }}
                    onChange={(e) => {
                      setCalendlyUrl(e.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {!showGoogleCalendarIframe ? (
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="google-calendar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Google Calendar Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="google-calendar"
                    name="google-calendar"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border border-black px-2 py-1 mr-3"
                    placeholder="john@gmail.com"
                    value={googleCalendarEmail}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        submitButtonHandler();
                      }
                    }}
                    onChange={(e) => {
                      setGoogleCalendarEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={submitButtonHandler}
            >
              Submit
            </button>

            {showCalendlyIframe || showGoogleCalendarIframe ? (
              <div className="mt-3">
                <button
                  className="underline text-blue-500"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    // change button name
                    setCopyPageUrlButtonName("Copied");
                    setTimeout(() => {
                      setCopyPageUrlButtonName("Copy this page URL");
                    }, 2000);
                  }}
                >
                  {copyPageUrlButtonName}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3 text-sm text-center text-gray-500">
            Important: Fastlendly does not have access to your Google Calendar!
          </div>
          <div className="mt-3 text-sm text-center text-gray-500">
            Questions?{" "}
            <a
              className="underline text-blue-500"
              href="mailto:hi@greg.technology"
            >
              Email me
            </a>
            . I make{" "}
            <a
              className="underline text-blue-500"
              href="https://recurse.greg.technology/"
              target="_blank"
            >
              other things
            </a>{" "}
            too.
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [showCalendlyIframe, setShowCalendlyIframe] = useState(false);
  const [googleCalendarEmail, setGoogleCalendarEmail] = useState("");
  const [showGoogleCalendarIframe, setShowGoogleCalendarIframe] =
    useState(false);

  useEffect(() => {
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

    // build new state
    // urlencode calendlyurl if present
    // urlencode google calendar email if present
    // use replacestate
    window.history.replaceState(
      {},
      "",
      `?${stateParts.join("&")}`, // ?cdly=...&gcal=...
    );
  }

  return (
    <div className="bg-gray-100 h-screen">
      <div className="w-full bg-red-100 p-4 text-center border-b border-black">
        <h1 className="text-black text-3xl">Fastlendly</h1>
        <p>
          See someone's Calendly with your own Google Calendar side by side!
          <br />
          Questions?{" "}
          <a
            className="underline text-blue-500"
            href="mailto:hi@greg.technology"
          >
            Email me
          </a>
          .
        </p>
      </div>

      <div className="flex h-full">
        <div
          className={`w-1/2 flex flex-col items-center justify-center border-r border-black ${
            showCalendlyIframe ? "" : "bg-green-100"
          }`}
        >
          {showCalendlyIframe ? (
            <iframe
              title="calendly"
              src={calendlyUrl}
              width="100%"
              height="100%"
            ></iframe>
          ) : (
            <>
              <div>Enter a Calendly URL here:</div>
              <div>
                <input
                  type="text"
                  className="border border-black px-2 py-1 mr-3"
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
                <button
                  className="bg-blue-500 text-white px-2 py-2 rounded-md"
                  onClick={submitButtonHandler}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>

        <div className="w-1/2 bg-blue-100 flex flex-col items-center justify-center">
          {showGoogleCalendarIframe ? (
            <iframe
              title="google-calendar"
              src={`https://calendar.google.com/calendar/embed?src=${googleCalendarEmail}`}
              width="100%"
              height="100%"
            ></iframe>
          ) : (
            <>
              <div>Enter your Google Calendar email address here:</div>
              <div>
                <input
                  type="text"
                  className="border border-black px-2 py-1 mr-3"
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
                <button
                  className="bg-blue-500 text-white px-2 py-2 rounded-md"
                  onClick={submitButtonHandler}
                >
                  Submit
                </button>
              </div>
              <div className="mt-3">
                <p className="text-sm">
                  Important note: Fastlendly does <b>not</b> have access to your
                  Google Calendar.
                </p>
                <p className="text-sm">
                  You are the only one seeing your calendar because you are
                  logged into your Google account.
                </p>
                <p className="text-sm">
                  You can try this page in an Incognito window and see that your
                  calendar does not show up.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

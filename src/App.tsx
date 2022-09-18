import "./style/main.scss";
import React from "react";
import { QueryEngine } from "@comunica/query-sparql-solid";
import {
  getDefaultSession,
  handleIncomingRedirect,
  login,
} from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";
import { ObjectForm, FormRenderer } from "object-forms";
import { WorkItem } from "./model/WorkItem";

const App: React.FC = () => {
  const engine = new QueryEngine();

  const [webId, setWebId] = useState(getDefaultSession().info.webId);

  const solidLoginHandler: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    login({
      redirectUrl: window.location.href,
      oidcIssuer: "https://solidcommunity.net",
      clientName: "Remo Dietlicher's Homepage",
    });
    setWebId(getDefaultSession().info.webId);
  };

  useEffect(() => {
    // After redirect, the current URL contains login information.
    handleIncomingRedirect({
      restorePreviousSession: true,
    }).then((info) => {
      console.log(info);
      setWebId(getDefaultSession().info.webId);
    });
  }, []);

  console.log(webId);

  const renderer = new FormRenderer();
  const meta = renderer.render(WorkItem);

  return (
    <>
      <button onClick={solidLoginHandler}>login</button>
      <ObjectForm meta={meta}></ObjectForm>
    </>
  );
};

export default App;

import { Dispatch, SetStateAction, useEffect } from "react";
import NProgress from "nprogress";
import Router from "next/router";

export const useNprogress = (setLoading: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    const handleRouteStart = () => {
      setLoading(true);
      NProgress.start();
    };
    const handleRouteDone = () => {
      setLoading(false);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount
      Router.events.on("routeChangeStart", handleRouteStart);
      Router.events.on("routeChangeComplete", handleRouteDone);
      Router.events.on("routeChangeError", handleRouteDone);
    };
  }, [setLoading]);
};

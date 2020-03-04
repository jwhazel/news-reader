export { getLastVisit, setLastVisit };

let getLastVisit = () => {
  window.localStorage.getItem("lastVisit");
};

let setLastVisit = () => {
  let rightNow = new Date();
  window.localStorage.setItem("lastVisit", rightNow);
};

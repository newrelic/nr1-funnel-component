/*
const testdata = {
  labels: ["Impressions", "Add To Cart", "Buy"],
  subLabels: ["Direct", "Social Media", "Ads"],
  colors: [["#FFB178"], ["#A0BBFF"], ["#A0F9FF"]],
  values: [[3500, 2500, 6500], [3300, 1400, 1000], [600, 200, 130]]
};
*/

const testdata = {
  accountId: 1606862,
  funnel: {
    event: "PageView",
    measure: "session"
  },
  series: [
    {
      label: "All Users",
      nrql: "appName = 'WebPortal'"
    },
    {
      label: "Columbus",
      nrql: "appName = 'WebPortal' and city = 'Columbus'"
    },
    {
      label: "Internet Explorer",
      nrql: "appName = 'WebPortal' and userAgentName = 'IE'"
    }
  ],
  steps: [
    {
      label: "Homepage",
      nrql:
        "pageUrl = 'http://webportal.telco.nrdemo.com/' OR pageUrl = 'http://webportal.telco.nrdemo.com/index.html'"
    },
    {
      label: "Plans",
      nrql: "pageUrl like 'http://webportal.telco.nrdemo.com/browse/plans%'"
    },
    {
      label: "Cart",
      nrql: "pageUrl = 'http://webportal.telco.nrdemo.com/shoppingcart'"
    },
    {
      label: "Checkout",
      nrql: "pageUrl = 'http://webportal.telco.nrdemo.com/checkout'"
    }
  ]
};

export default testdata;

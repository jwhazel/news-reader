import Parser from "rss-parser";
import { format } from "date-fns";

export default async url => {
  url = url || "http://rssfeeds.courier-journal.com/courierjournal/home?x=1";
  let stockImage =
    "https://www.gannett-cdn.com/-mm-/58dc3c3ba58dfbe649e10b4aeeb4035096ee69ef/c=0-393-4050-3438/local/-/media/2017/10/30/Louisville/Louisville/636449590166601298-KY-Louisville-Badge-Grdnt-FullClr-RGB-600.png??width=250&height=250&fit=bounds";

  //Grab the RSS feed
  const parser = new Parser();
  let feed = [],
    rawFeed = await parser.parseURL(url);

  //Parse it into the desired format for our app
  feed = rawFeed.items.map(n => {
    let obj = {
      title: stripHtmlEntities(n.title),
      creator: stripHtmlEntities(n.creator),
      link: n.link,
      contentSnippet: stripHtmlEntities(n.contentSnippet),
      pubDate: format(
        new Date(stripHtmlEntities(n.pubDate)),
        "E, LLL do y - h:mmaaaa"
      ),
      timestamp: timestamp(stripHtmlEntities(n.pubDate)),
      image: n.enclosure
        ? `${n.enclosure.url}?width=250&height=250&fit=bounds`
        : stockImage
    };

    return obj;
  });

  //Sort based on timestamp
  let sortedFeed = feed.sort((a, b) => {
    if (a.timestamp > b.timestamp) return -1;
    if (a.timestamp < b.timestamp) return 1;
    return 0;
  });

  return sortedFeed;

  /**
   * Strip any unconverted html entites out of the strings
   */
  function stripHtmlEntities(str) {
    if (typeof str !== "string") {
      return str;
    } else {
      return str
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&mdash;/g, "-")
        .trim();
    }
  }

  function timestamp(str) {
    let d = new Date(str);
    return d.getTime();
  }
};

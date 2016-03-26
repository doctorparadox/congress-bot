// A codelet is a snippet of code that creates a new endpoint in your book's API.
// https://github.com/fieldbook/api-docs/blob/master/codelets.md

exports.endpoint = function (request, response, done) {
  // Access properties off the request like headers, query or body:
  var repquery = request.query.text;

  // Use the pre-initialized client to access your book:

 return client.list('legislators', {full_name: repquery}).then(function (congresspeople) {
    var congressperson = congresspeople[0];
    if (!congressperson) return "No currently-serving Congress members by that name.";

  // Make nice pretty URLs to click from the raw data   
   var twitter_url = "https://www.twitter.com/" + congressperson.twitter;
   var youtube_url = "https://www.youtube.com/user/" + congressperson.youtube;
   var facebook_url = "https://www.facebook.com/" + congressperson.facebook;
     
    return {
      text: "Found information about Congressperson " + congressperson.full_name,
      
      // By default the bot's reply will be "ephemeral," meaning only you can see it in the channel. 
      // If you want the whole channel to be able to see the results of your query, this'll do it,
      // else you can comment it out to keep the return private.
      "response_type": "in_channel",
      attachments: [{
        title: congressperson.full_name,
        title_link: congressperson.url,
        fields: [
          {title: "State", value: congressperson.state, short: true},
          {title: "Senate or House?", value: congressperson.type, short: true},
          {title: "Gender", value: congressperson.gender, short: true},
          {title: "Party", value: congressperson.party, short: true},
          {title: "Address", value: congressperson.address, short: true},
          {title: "Phone", value: congressperson.phone, short: true},
          {title: "Twitter", value: twitter_url, short: true},
          {title: "Facebook", value: facebook_url, short: true},
          {title: "Youtube", value: youtube_url, short: true},
          {title: "Website", value: congressperson.url, short: true},
          {title: "RSS feed", value: congressperson.rss_url, short: true},
          {title: "Contact form", value: congressperson.contact_form, short: true},
        ],
        fallback: congressperson.full_name,
      }]
    }
  })

}


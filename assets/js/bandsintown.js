// function searchBandsInTown start for search the artist including all the information
function searchBandsInTown(artistInput) {
  let queryArtist = 'https://rest.bandsintown.com/artists/' + artistInput + '?app_id=codingbootcamp';
  let queryEvent  = 'https://rest.bandsintown.com/artists/' + artistInput + '/events?app_id=codingbootcamp';

  // run bandsintown API to get the info
  $.ajax({
    url: queryArtist,
    method: "GET",
    success:function(response) {
      $('.js-artist-name').html(response.name);
      $('.js-artist-image').attr('src', response.thumb_url);
      $('.facebook_page_url').attr('href',response.facebook_page_url);
    }
  });

  // run bandsintown API to get the events
  $.ajax({
    url: queryEvent,
    method: "GET",
    error:function(xhr, textStatus, errorThrown){
      $(".js-no-artist").show();
      $(".js-artist-info").hide();

      },
    success:function(response) {

      $(".js-no-artist").hide();
      $(".js-artist-info").show();
      if (!response.length) {
        $(".js-no-events").show();
        $(".js-event-table").hide();
      } else {
        $(".js-event-table").show();
        $(".js-no-events").hide();
        $(".event").empty();
        
        // Loop through results
        $.each(response, function(i, data) {
          if (i <= 10) {
            let event = $("<tr>");
            event.append("<td class='td'>" + moment(data.datetime).format('MM/DD/YY') + "</td>" );
            event.append("<td class='td'>" + data.venue.name + "</td>");
            event.append("<td class='td'>" + data.venue.city + ", " + data.venue.country +"</td>" );
            $(".event").append(event);
          }
        });
      }
    }
  });

 
}
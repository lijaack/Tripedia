//Paul adding API for yelp search

$(document).ready(function () {

    // Eliminate CORS issues
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $(document).on("click", "#run-submit", function () {

        event.preventDefault()

        var location = $("#toDestination").val()

        $.ajax({
            url: 'https://api.yelp.com/v3/businesses/search?term=activities' + '&location=' + location + '',
            method: "GET",
            // Below with yelp API Key
            headers: {
                authorization: "Bearer 8ldJWpM7u31LuDTTQXmQZ7pJb8PGvrEzgMWXOYN8EXy6C7tEY59Cdd-9EpslvK0K8jg2hLLW7GCWEGQpmdcy0ry4LLc6dKaG739eZGCCWWvUW4Szt7HpOeG7BvH-W3Yx"
            }
        }).then(function (response) {
            console.log(response)

          //  for (var i = 0; i < response.businesses.length; i++) {
            for (var i = 0; i < 3; i++) {
                $("#yelpInfo").append('<img class="thumbnail" width=40% src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
            }
            // for modal
            for (var i = 0; i < response.businesses.length; i++) {
                $("#yelp-modal-body").append('<img class="thumbnail" width=60% src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
            }

        });

    });
        
    });
package DDG::Spice::Aqi;
# ABSTRACT: Returns the current air quality index (AQI) read from airnow.gov for a given zip code within the US.

use DDG::Spice;

name "AQI";
description "Get current air quality indices";
source "AirNow";
primary_example_queries "aqi 10001";
category "physical_properties";
topics "geography", "science", "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Aqi.pm";
attribution github => ["https://github.com/schluchc", "Christian Schluchter"],
            twitter => ["https://twitter.com/CSchluchter", "CSchluchter"];

triggers startend => "aqi", "air quality", "air quality index", "air pollution";

spice to => 'http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=$1&API_KEY={{ENV{DDG_SPICE_AQI_APIKEY}}}';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    my $query = shift;

    if($query eq 'local') {

        # Set $query to failed return value. This way we can keep `else`
        # statements limited.
        $query = '';

        if(defined($loc) && exists($loc->{postal_code}) && exists($loc->{country_code})) {
            # The current API only supports USA postal codes.
            if($loc->{country_code} eq 'US') {
                $query = $loc->{postal_code};
            }
        }

        # At this point $query can either be an empty string that we
        # set before the location checks, or it can be a valid zipcode.
        return unless $query;
    }else{
        #check if the entire remainder string is a 5 digits number;
        return unless $query =~ qr/^\d{5}$/;
    }

    # we know it exists, it's a number and it has 5 digits;
    return $query;
};

1;

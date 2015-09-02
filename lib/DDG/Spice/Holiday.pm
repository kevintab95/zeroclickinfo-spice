package DDG::Spice::Holiday;
# ABSTRACT: Query timeanddate.com for a holiday

use DDG::Spice;
use Locale::Country;
use POSIX qw(strftime);

Locale::Country::alias_code('usa' => 'us');

name "Time and Date holiday search";
source "timeanddate.com";
icon_url "/i/www.timeanddate.com.ico";
description "Search for holidays";
primary_example_queries "when is halloween", "when is constitution day in kazakhstan";
category "dates";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Holiday.pm";

attribution github => ['https://github.com/iambibhas', 'Bibhas'],
            twitter => ['https://twitter.com/bibhasdn', 'Bibhas D'];

triggers start => 'when is', 'when was', 'what day is', 'what day was';

spice from => '([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://www.timeanddate.com/scripts/ddg.php?m=whenis&c=$1&q=$2&y=$3&callback={{callback}}';

handle query_lc => sub {
    return unless ($_);

    my ($tense, $q, $c, $y);

    if ($_ =~ /\ ?(?:when|what day)\ ?(is|was)/g) {
        $tense = $1;
        $_ =~ s/\ ?(when|what day)\ ?(is|was)\ ?//g;
    }

    if (/\s+in\s+(.*)$/p) {
        # Did the user query for holidays in a specific country?
        ($q, $c) = (${^PREMATCH}, $1);

        # For cases like "in the usa"
        $c =~ s/\ ?\bthe\b\ ?//g;
        if (code2country($c)) {
            $c = code2country($c)
        }
        # because the country name for 'us' is 'the united states'
        $c =~ s/\ ?\bthe\b\ ?//g;
    } elsif ($loc && $loc->country_name) {
        # No - check the country the user is currently in.
        ($q, $c) = ($_, $loc->country_name);
    } else {
        # Fallback to US if no country can be determined, that's the
        # country that has best holiday coverage.
        ($q, $c) = ($_, 'us');
    }

    # Block queries like "a day"
    return if $q =~ /^[a-z1-9]?\ ?day$/;

    if ($q =~ /([\d]{4})/) {
        $y = $1;
    } else {
        $y = " ";

        if ($tense eq 'was') {
            $y = strftime "%Y", localtime;
        }
    }

    $q =~ s/\ *\d+\ *//g;

    # Kill eventual slashes to avoid misbehaviour of the `spice from'
    # regular expression.
    $q =~ s/\///g;
    $c =~ s/\///g;

    return $c, $q, $y;
};


1;

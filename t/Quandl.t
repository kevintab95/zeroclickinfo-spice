#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# to run tests use the following command:
# prove -Ilib t/Quandl.t

ddg_spice_test(
    [qw( DDG::Spice::Quandl::Fundamentals )],

    # primary example
    'AAPL revenue' => test_spice(
        '/js/spice/quandl/fundamentals/AAPL_REVENUE',
        call_type => 'include',
        caller => 'DDG::Spice::Quandl::Fundamentals',
    ),

    # order of trigger word should be
    'sales AAPL' => test_spice(
        '/js/spice/quandl/fundamentals/AAPL_REVENUE',
        call_type => 'include',
        caller => 'DDG::Spice::Quandl::Fundamentals',
    ),

    # CAPS should not deter
    'SALES aapl' => test_spice(
        '/js/spice/quandl/fundamentals/AAPL_REVENUE',
        call_type => 'include',
        caller => 'DDG::Spice::Quandl::Fundamentals',
    ),

    # No results though 'a' is the Agilent ticker and 'debt' is an indicator trigger
    'owe a debt' => undef,

    # No results for a single ticker alone
    'aapl' => undef,

    # No results for a single indicator alone
    'revenue' => undef,
);


ddg_spice_test(
	[qw( DDG::Spice::Quandl::HomeValues )],
    
    # primary zip example
    '11235 homes' => test_spice(
		'/js/spice/quandl/home_values/ZIP_ALLHOMES_11235',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # secondary zip example
    'expensive homes 11235' => test_spice(
		'/js/spice/quandl/home_values/ZIP_TOPTIER_11235',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # metro example, is not caught by 'new york' trigger
    'new york city homes' => test_spice(
		'/js/spice/quandl/home_values/METRO_ALLHOMES_NEWYORKNY',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # state example
    'new york homes' => test_spice(
		'/js/spice/quandl/home_values/STATE_ALLHOMES_NEWYORK',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    
    # No results for a single region alone
	'27510' => undef,
    'new york' => undef,
    'raleigh' => undef,
    
    # No results for a single trigger alone
    'homes' => undef,
);
done_testing;
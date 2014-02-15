#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MassOnTime )],
    'catholic mass near Pittsburgh' => test_spice(
        '/js/spice/mass_on_time/mass/Pittsburgh',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic churches near New York' => test_spice(
        '/js/spice/mass_on_time/parish/New%20York',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
);

done_testing;


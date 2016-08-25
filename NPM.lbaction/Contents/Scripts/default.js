// LaunchBar Action Script

function run()
{
    LaunchBar.openURL('https://www.npmjs.com');
}

function runWithString(argument)
{
    var data = HTTP.getJSON('https://ac.cnstrc.com/autocomplete/' + encodeURIComponent(argument) + '?autocomplete_key=CD06z4gVeqSXRiDL2ZNK');

    if (typeof data === 'undefined' || typeof data.data === 'undefined') {
        LaunchBar.log('HTTP.getJSON() returned undefined');
        return [];
    }

    packages = data.data.sections.packages;

    try {
        var suggestions = [];

        packages.forEach(function(package) {
            suggestions.push({
                'title' : package.value,
                'subtitle': package.data.description,
                'icon' : 'npm-icon.icns',
                'action': 'openNpm',
                'actionArgument': package.value,
                'actionRunsInBackground': true,
                'actionReturnsItems': false,
                'alwaysShowsSubtitle': true
            });
        });

        return suggestions;
    } catch (exception) {
        LaunchBar.log('Exception while parsing result: ' + exception);
        return [];
    }
}

function openNpm(argument) {
    LaunchBar.openURL('https://www.npmjs.com/package/' + encodeURIComponent(argument));
}


//
// Changes the css be an IE friendly
//
var isIE = jQuery.browser.msie;

var cssChange = function() {
	if (isIE) {
		$('[rel=stylesheet]').attr('href', 'css/fortune-ie.css');
	}
	else {
		$('[rel=stylesheet]').attr('href', 'css/fortune.css');
	}
};

//
//
//
var SortOrder =
{
    SalesDesc:0,
    SalesAsc:1,
    NameDesc:2,
    NameAsc:3,
    GoalPercentDesc:4,
    GoalPercentAsc:5,
    TotalNewSalesDesc:6,
    TotalNewSalesAsc:7
	//removed the comma after 7 to stop an error
    //RepEarningsDesc:8,
    //RepEarningsAsc:9
};

var currentSortOrder = SortOrder.SalesDesc;

//
//
//
var setInteractiveElements = function () {
    $('.nameOrder').click(toggleNameSort);
    $('.salesOrder').click(toggleTotalNewSalesSort);
    $('.repSalesOrder').click(toggleSalesSort);
    //$('.earningsOrder').click(toggleRepEarningsSort);
};

//
//
//
var toggleSalesSort = function () {
    if (currentSortOrder == SortOrder.SalesDesc) {
        currentSortOrder = SortOrder.SalesAsc;
    }
    else {
        currentSortOrder = SortOrder.SalesDesc;
    }
    refreshDataTable();
};

//
//
//
var toggleTotalNewSalesSort = function () {
    if (currentSortOrder == SortOrder.TotalNewSalesDesc) {
        currentSortOrder = SortOrder.TotalNewSalesAsc;
    }
    else {
        currentSortOrder = SortOrder.TotalNewSalesDesc;
    }
    refreshDataTable();
};

//
//
//
var toggleNameSort = function () {
    if (currentSortOrder == SortOrder.NameAsc) {
        currentSortOrder = SortOrder.NameDesc;
    }
    else {
        currentSortOrder = SortOrder.NameAsc;
    }
    refreshDataTable();
};

//
//
//
//var toggleRepEarningsSort = function () {
//    if (currentSortOrder == SortOrder.RepEarningsAsc) {
//        currentSortOrder = SortOrder.RepEarningsDesc;
//    }
//    else {
//        currentSortOrder = SortOrder.RepEarningsAsc;
//    }
//    refreshDataTable();
//};

//
//
//
var compareSalesDesc = function (a, b) {
    if (a.Sales == b.Sales) {
        return compareNameAsc(a, b);
    }
    return a.Sales < b.Sales ? 1 : -1;
};

//
//
//
var compareSalesAsc = function (a, b) {
    if (a.Sales == b.Sales) {
        return compareNameAsc(a, b);
    }
    return a.Sales > b.Sales ? 1 : -1;
};

//
//
//
var compareTotalNewSalesDesc = function (a, b) {
    if (a.TotalNewSales == b.TotalNewSales) {
        return compareNameDesc(a, b);
    }
    return a.TotalNewSales < b.TotalNewSales ? 1 : -1;
};

//
//
//
var compareTotalNewSalesAsc = function (a, b) {
    if (a.TotalNewSales == b.TotalNewSales) {
        return compareNameAsc(a, b);
    }
    return a.TotalNewSales > b.TotalNewSales ? 1 : -1;
};

//
//
//
var compareNameDesc = function (a, b) {
    return a.Name < b.Name ? 1 : -1;
};

//
//
//
var compareNameAsc = function (a, b) {
    return a.Name > b.Name ? 1 : -1;
};

//
//
//
var comparePercentToGoalDesc = function (a, b) {
    if (a.PercentToGoal == b.PercentToGoal) {
        return compareSalesDesc(a, b);
    }

    return a.PercentToGoal < b.PercentToGoal ? 1 : -1;
};

//
//
//
var comparePercentToGoalAsc = function (a, b) {
    if (a.PercentToGoal == b.PercentToGoal) {
        return compareSalesAsc(a, b);
    }

    return a.PercentToGoal > b.PercentToGoal ? 1 : -1;
};

//
//
//
var sortData = function (data, sortOrder) {

    if (!sortOrder) {
        sortOrder = currentSortOrder;
    }

    switch (sortOrder) {
        case SortOrder.SalesDesc:
            data = data.sort(compareSalesDesc);
            break;
        case SortOrder.SalesAsc:
            data = data.sort(compareSalesAsc);
            break;
        case SortOrder.TotalNewSalesDesc:
            data = data.sort(compareTotalNewSalesDesc);
            break;
        case SortOrder.TotalNewSalesAsc:
            data = data.sort(compareTotalNewSalesAsc);
            break;
        case SortOrder.NameDesc:
            data = data.sort(compareNameDesc);
            break;
        case SortOrder.NameAsc:
            data = data.sort(compareNameAsc);
            break;
        case SortOrder.GoalPercentDesc:
            data = data.sort(comparePercentToGoalDesc);
            break;
        case SortOrder.GoalPercentAsc:
            data = data.sort(comparePercentToGoalAsc);
            break;
    }
    return data;
};

//
//
//
var parseQueryString = function () {
    var vars = [], hash;
    var q = document.URL.split('?')[1];
    if (q != undefined) {
        q = q.split('&');
        for (var i = 0; i < q.length; i++) {
            hash = q[i].split('=');
            vars.push(hash[1]);
            vars[hash[0]] = hash[1];
        }
    }
    return vars;
};

//
//
//
var getOfficeNameById = function (officeId, data) {
    for (var d in data) {
        if (data[d].OfficeId == officeId) {
            return data[d].Name;
        }
    }
    return "";
};

//
//
//
var getOfficeIdByName = function (officeName, data) {
    for (var d in data) {
        if (data[d].Name == officeName) {
            return data[d].OfficeId;
        }
    }
    return "";
};

//
//
//
var getRegionNameByOfficeId = function (officeId, data) {
    for (var d in data) {
        if (data[d].OfficeId == officeId) {
            return data[d].RegionName;
        }
    }
    return "";
};

//
//
//
var getRepsByOfficeName = function (officeName, data) {
    var result = new Array();

    for (var d in data) {
        if (data[d].OfficeName == officeName) {
            result.push(data[d]);
        }
    }
    return result;
};

//
//
//
var getRegionIdByName = function (regionName, data) {
    for (var d in data) {
        if (data[d].Name == regionName) {
            return data[d].RegionId;
        }
    }
    return "";
};

//
// Projects are assumed to be sorted by payment date
// 1st qualified project, earned += $100
// 5th qualified project, earned += cost of iPad
// All other qualified projects, earned += $75
//
var calculateRepEarnings = function (projects) {
    // Projects are assumed to be sorted by payment date
    // 1st qualified project, earned += $100
    // All other qualified projects where prize != iPad or Other, earned += $75
    var earned = 0;
    var firstPrize = false;

    for (var i = 0; i < projects.length; i++) {
        if (!firstPrize && projects[i].Status == "Qualified") {
            earned = 100;
            firstPrize = true;
        }
        else if (projects[i].Prize != "iPad" && projects[i].Prize != "Other" && projects[i].Status == "Qualified") {
            earned += 75;
        }
    }

    return earned;
};

//
// Returns the number of offices associated with the specified region
//
var getNumberOfOfficesInRegion = function (officeData, regionName) {
    var officeCount = 0;

    for (var i = 0; i < officeData.length; i++) {
        if (officeData[i].RegionName == regionName) {
            officeCount++
        }
    }

    return officeCount
};

//
//
//
var displayRegionSalesBar = function (regionSales, officeCount, newBar) {
	if (regionSales >=1 && regionSales <= 6) {
		newBar.animate({"width": "1px"}, "slow");
	}
    else if (regionSales < 2375) {  // 2375 = the max # of offices in any one region * 125
		newBar.animate({"width":((regionSales / 2375) * 97) + "%"}, "slow");
    }
    else {
        newBar.animate({"width":97 + "%"}, "slow");
        $('#regionTable .scoreBar').css('background-color', '#C33');
    }
};

//
//
//
var displayOfficeSalesBar = function (officeSales, newBar, width) {
    if (officeSales <= 125) {
        newBar.animate({"width":((officeSales * width) / 125) + "%"}, 'slow');
    }
    else {
        newBar.animate({"width":width + "%"}, "slow");
        $('#officeTable .scoreBar').css('background-color', '#C33');
    }
};

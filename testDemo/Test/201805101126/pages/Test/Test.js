const util = require("../../utils/util.js");
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 87,//选中的项
    motto: 'Hello Worldss',
    userInfo: {},
    listData: [{ "Row": 1, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 4.0, "WbycwbzfNumber": 10417.0, "WbycwbplNumber": 3283.0, "WbycwbdzNumber": 19114.0, "WbzfNumber": 10417.0, "WbaveragezfNumber": 2604.25, "WbplNumber": 3283.0, "WbaverageplNumber": 820.75, "WbdzNumber": 19114.0, "WbaveragedzNumber": 4778.5, "WbfansNumber": 5829128.0, "WbycspreadNumber": 781.0, "WbzhspreadNumber": 888.0, "WbactiveNumber": 140.0, "WbfollowNumber": 1353.0, "Wbhitszbi": 737.0, "Tvid": 34791, "HitTime": "20180501", "ShortName": "奔跑吧2", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 2, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 6.0, "WbycwbzfNumber": 6926.0, "WbycwbplNumber": 2834.0, "WbycwbdzNumber": 6075.0, "WbzfNumber": 6935.0, "WbaveragezfNumber": 1155.83, "WbplNumber": 2871.0, "WbaverageplNumber": 478.5, "WbdzNumber": 6429.0, "WbaveragedzNumber": 1071.5, "WbfansNumber": 1096918.0, "WbycspreadNumber": 743.0, "WbzhspreadNumber": 838.0, "WbactiveNumber": 146.0, "WbfollowNumber": 1208.0, "Wbhitszbi": 694.0, "Tvid": 34796, "HitTime": "20180501", "ShortName": "我想和你唱3", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 3, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 3.0, "WbsendNumber": 3.0, "WbycwbzfNumber": 2116.0, "WbycwbplNumber": 1258.0, "WbycwbdzNumber": 17940.0, "WbzfNumber": 2116.0, "WbaveragezfNumber": 705.33, "WbplNumber": 1258.0, "WbaverageplNumber": 419.33, "WbdzNumber": 17940.0, "WbaveragedzNumber": 5980.0, "WbfansNumber": 11710669.0, "WbycspreadNumber": 679.0, "WbzhspreadNumber": 799.0, "WbactiveNumber": 120.0, "WbfollowNumber": 1414.0, "Wbhitszbi": 671.0, "Tvid": 1384, "HitTime": "20180501", "ShortName": "快乐大本营", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 4, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 5.0, "WbycwbzfNumber": 879.0, "WbycwbplNumber": 1211.0, "WbycwbdzNumber": 12268.0, "WbzfNumber": 900.0, "WbaveragezfNumber": 180.0, "WbplNumber": 1250.0, "WbaverageplNumber": 250.0, "WbdzNumber": 14257.0, "WbaveragedzNumber": 2851.4, "WbfansNumber": 2275088.0, "WbycspreadNumber": 632.0, "WbzhspreadNumber": 741.0, "WbactiveNumber": 143.0, "WbfollowNumber": 1271.0, "Wbhitszbi": 625.0, "Tvid": 34655, "HitTime": "20180501", "ShortName": "极限挑战4", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 5, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 8.0, "WbsendNumber": 9.0, "WbycwbzfNumber": 952.0, "WbycwbplNumber": 938.0, "WbycwbdzNumber": 3745.0, "WbzfNumber": 953.0, "WbaveragezfNumber": 105.89, "WbplNumber": 951.0, "WbaverageplNumber": 105.67, "WbdzNumber": 3852.0, "WbaveragedzNumber": 428.0, "WbfansNumber": 2096755.0, "WbycspreadNumber": 613.0, "WbzhspreadNumber": 698.0, "WbactiveNumber": 193.0, "WbfollowNumber": 1264.0, "Wbhitszbi": 615.0, "Tvid": 1444, "HitTime": "20180501", "ShortName": "天天向上", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 6, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 5.0, "WbsendNumber": 5.0, "WbycwbzfNumber": 493.0, "WbycwbplNumber": 2153.0, "WbycwbdzNumber": 6252.0, "WbzfNumber": 493.0, "WbaveragezfNumber": 98.6, "WbplNumber": 2153.0, "WbaverageplNumber": 430.6, "WbdzNumber": 6252.0, "WbaveragedzNumber": 1250.4, "WbfansNumber": 401439.0, "WbycspreadNumber": 610.0, "WbzhspreadNumber": 721.0, "WbactiveNumber": 156.0, "WbfollowNumber": 1121.0, "Wbhitszbi": 598.0, "Tvid": 34879, "HitTime": "20180501", "ShortName": "高能少年团2", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 7, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 2.0, "WbsendNumber": 2.0, "WbycwbzfNumber": 1262.0, "WbycwbplNumber": 1322.0, "WbycwbdzNumber": 544.0, "WbzfNumber": 1262.0, "WbaveragezfNumber": 631.0, "WbplNumber": 1322.0, "WbaverageplNumber": 661.0, "WbdzNumber": 544.0, "WbaveragedzNumber": 272.0, "WbfansNumber": 540308.0, "WbycspreadNumber": 611.0, "WbzhspreadNumber": 747.0, "WbactiveNumber": 95.0, "WbfollowNumber": 1147.0, "Wbhitszbi": 595.0, "Tvid": 32394, "HitTime": "20180501", "ShortName": "非常静距离", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 8, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 5.0, "WbsendNumber": 6.0, "WbycwbzfNumber": 1142.0, "WbycwbplNumber": 491.0, "WbycwbdzNumber": 3811.0, "WbzfNumber": 1148.0, "WbaveragezfNumber": 191.33, "WbplNumber": 514.0, "WbaverageplNumber": 85.67, "WbdzNumber": 4216.0, "WbaveragedzNumber": 702.67, "WbfansNumber": 485614.0, "WbycspreadNumber": 605.0, "WbzhspreadNumber": 702.0, "WbactiveNumber": 158.0, "WbfollowNumber": 1137.0, "Wbhitszbi": 593.0, "Tvid": 34652, "HitTime": "20180501", "ShortName": "向往的生活2", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 9, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 8.0, "WbsendNumber": 8.0, "WbycwbzfNumber": 575.0, "WbycwbplNumber": 982.0, "WbycwbdzNumber": 4050.0, "WbzfNumber": 575.0, "WbaveragezfNumber": 71.88, "WbplNumber": 982.0, "WbaverageplNumber": 122.75, "WbdzNumber": 4050.0, "WbaveragedzNumber": 506.25, "WbfansNumber": 143249.0, "WbycspreadNumber": 591.0, "WbzhspreadNumber": 681.0, "WbactiveNumber": 191.0, "WbfollowNumber": 1031.0, "Wbhitszbi": 578.0, "Tvid": 34633, "HitTime": "20180501", "ShortName": "我是大侦探", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 10, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 2.0, "WbsendNumber": 2.0, "WbycwbzfNumber": 242.0, "WbycwbplNumber": 601.0, "WbycwbdzNumber": 2930.0, "WbzfNumber": 242.0, "WbaveragezfNumber": 121.0, "WbplNumber": 601.0, "WbaverageplNumber": 300.5, "WbdzNumber": 2930.0, "WbaveragedzNumber": 1465.0, "WbfansNumber": 1795230.0, "WbycspreadNumber": 533.0, "WbzhspreadNumber": 673.0, "WbactiveNumber": 95.0, "WbfollowNumber": 1251.0, "Wbhitszbi": 552.0, "Tvid": 4689, "HitTime": "20180501", "ShortName": "非正式会谈", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 11, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 5.0, "WbsendNumber": 5.0, "WbycwbzfNumber": 694.0, "WbycwbplNumber": 258.0, "WbycwbdzNumber": 522.0, "WbzfNumber": 694.0, "WbaveragezfNumber": 138.8, "WbplNumber": 258.0, "WbaverageplNumber": 51.6, "WbdzNumber": 522.0, "WbaveragedzNumber": 104.4, "WbfansNumber": 121663.0, "WbycspreadNumber": 539.0, "WbzhspreadNumber": 639.0, "WbactiveNumber": 156.0, "WbfollowNumber": 1017.0, "Wbhitszbi": 535.0, "Tvid": 34825, "HitTime": "20180501", "ShortName": "无限歌谣季", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 12, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 4.0, "WbycwbzfNumber": 26.0, "WbycwbplNumber": 2858.0, "WbycwbdzNumber": 1564.0, "WbzfNumber": 26.0, "WbaveragezfNumber": 6.5, "WbplNumber": 2858.0, "WbaverageplNumber": 714.5, "WbdzNumber": 1564.0, "WbaveragedzNumber": 391.0, "WbfansNumber": 1363917.0, "WbycspreadNumber": 461.0, "WbzhspreadNumber": 592.0, "WbactiveNumber": 140.0, "WbfollowNumber": 1227.0, "Wbhitszbi": 506.0, "Tvid": 1341, "HitTime": "20180501", "ShortName": "非常完美", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 13, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 5.0, "WbycwbzfNumber": 507.0, "WbycwbplNumber": 342.0, "WbycwbdzNumber": 77.0, "WbzfNumber": 508.0, "WbaveragezfNumber": 101.6, "WbplNumber": 346.0, "WbaverageplNumber": 69.2, "WbdzNumber": 83.0, "WbaveragedzNumber": 16.6, "WbfansNumber": 27546.0, "WbycspreadNumber": 507.0, "WbzhspreadNumber": 610.0, "WbactiveNumber": 143.0, "WbfollowNumber": 888.0, "Wbhitszbi": 498.0, "Tvid": 34607, "HitTime": "20180501", "ShortName": "我们在行动", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 14, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 4.0, "WbycwbzfNumber": 122.0, "WbycwbplNumber": 175.0, "WbycwbdzNumber": 177.0, "WbzfNumber": 122.0, "WbaveragezfNumber": 30.5, "WbplNumber": 175.0, "WbaverageplNumber": 43.75, "WbdzNumber": 177.0, "WbaveragedzNumber": 44.25, "WbfansNumber": 1057899.0, "WbycspreadNumber": 432.0, "WbzhspreadNumber": 545.0, "WbactiveNumber": 140.0, "WbfollowNumber": 1205.0, "Wbhitszbi": 479.0, "Tvid": 34832, "HitTime": "20180501", "ShortName": "鲁豫有约4", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 15, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 6.0, "WbsendNumber": 9.0, "WbycwbzfNumber": 186.0, "WbycwbplNumber": 135.0, "WbycwbdzNumber": 208.0, "WbzfNumber": 215.0, "WbaveragezfNumber": 23.89, "WbplNumber": 155.0, "WbaverageplNumber": 17.22, "WbdzNumber": 250.0, "WbaveragedzNumber": 27.78, "WbfansNumber": 192816.0, "WbycspreadNumber": 448.0, "WbzhspreadNumber": 542.0, "WbactiveNumber": 175.0, "WbfollowNumber": 1057.0, "Wbhitszbi": 478.0, "Tvid": 34797, "HitTime": "20180501", "ShortName": "足球解说大会", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 16, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 4.0, "WbycwbzfNumber": 127.0, "WbycwbplNumber": 179.0, "WbycwbdzNumber": 281.0, "WbzfNumber": 127.0, "WbaveragezfNumber": 31.75, "WbplNumber": 179.0, "WbaverageplNumber": 44.75, "WbdzNumber": 281.0, "WbaveragedzNumber": 70.25, "WbfansNumber": 382346.0, "WbycspreadNumber": 441.0, "WbzhspreadNumber": 554.0, "WbactiveNumber": 140.0, "WbfollowNumber": 1116.0, "Wbhitszbi": 477.0, "Tvid": 34877, "HitTime": "20180501", "ShortName": "拜托了妈妈", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 17, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 4.0, "WbsendNumber": 4.0, "WbycwbzfNumber": 94.0, "WbycwbplNumber": 187.0, "WbycwbdzNumber": 213.0, "WbzfNumber": 94.0, "WbaveragezfNumber": 23.5, "WbplNumber": 187.0, "WbaverageplNumber": 46.75, "WbdzNumber": 213.0, "WbaveragedzNumber": 53.25, "WbfansNumber": 1589174.0, "WbycspreadNumber": 424.0, "WbzhspreadNumber": 538.0, "WbactiveNumber": 140.0, "WbfollowNumber": 1240.0, "Wbhitszbi": 477.0, "Tvid": 32403, "HitTime": "20180501", "ShortName": "中华好诗词5", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 18, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 7.0, "WbsendNumber": 7.0, "WbycwbzfNumber": 95.0, "WbycwbplNumber": 50.0, "WbycwbdzNumber": 318.0, "WbzfNumber": 95.0, "WbaveragezfNumber": 13.57, "WbplNumber": 50.0, "WbaverageplNumber": 7.14, "WbdzNumber": 318.0, "WbaveragedzNumber": 45.43, "WbfansNumber": 4588071.0, "WbycspreadNumber": 396.0, "WbzhspreadNumber": 485.0, "WbactiveNumber": 181.0, "WbfollowNumber": 1332.0, "Wbhitszbi": 469.0, "Tvid": 1342, "HitTime": "20180501", "ShortName": "非诚勿扰", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 19, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 5.0, "WbsendNumber": 6.0, "WbycwbzfNumber": 72.0, "WbycwbplNumber": 139.0, "WbycwbdzNumber": 162.0, "WbzfNumber": 72.0, "WbaveragezfNumber": 12.0, "WbplNumber": 141.0, "WbaverageplNumber": 23.5, "WbdzNumber": 165.0, "WbaveragedzNumber": 27.5, "WbfansNumber": 68513.0, "WbycspreadNumber": 400.0, "WbzhspreadNumber": 501.0, "WbactiveNumber": 158.0, "WbfollowNumber": 967.0, "Wbhitszbi": 434.0, "Tvid": 34650, "HitTime": "20180501", "ShortName": "女人有话说", "Webid": 87, "WxMaxRead": null, "ListId": 13 }, { "Row": 20, "WxYcsendNumber": 0.0, "WxYcTotalReadNumber": 0.0, "WxYcAverageReadNumber": 0.0, "WxYcProportion": 0.0, "WxYcTotalDzNumber": 0.0, "WxYcAverageDzNumber": 0.0, "WxYcDzLead": 0.0, "WxHeadNumber": 0.0, "WxHeadReadNumber": 0.0, "WxHeadAverageReadNumber": 0.0, "WxHeadDzNumber": 0.0, "WxHeadAverageDzNumber": 0.0, "WxHeadDzLead": 0.0, "WxTotalReadNumber": 0.0, "WxAverageReadNumber": 0.0, "WxTotaldDzNumber": 0.0, "WxAverageDzNumber": 0.0, "WxMaxDzNumber": 0.0, "Wxdzlead": 0.0, "WxSendDaysNumber": 0.0, "WxSendNumber": 0.0, "WxSendTimesNumber": 0.0, "WxOnehHunThoNumber": 0.0, "WxOnehHunThoProportion": 0.0, "WxYcSpreadNumber": 0.0, "WxHeadSpreadNumber": 0.0, "WxSpreadNumber": 0.0, "WxactiveNumber": 0.0, "WxHotSpreadNumber": 0.0, "Wxhitszci": 0.0, "WbycwbNumber": 1.0, "WbsendNumber": 1.0, "WbycwbzfNumber": 149.0, "WbycwbplNumber": 2513.0, "WbycwbdzNumber": 1318.0, "WbzfNumber": 149.0, "WbaveragezfNumber": 149.0, "WbplNumber": 2513.0, "WbaverageplNumber": 2513.0, "WbdzNumber": 1318.0, "WbaveragedzNumber": 1318.0, "WbfansNumber": 0.0, "WbycspreadNumber": 537.0, "WbzhspreadNumber": 709.0, "WbactiveNumber": 60.0, "WbfollowNumber": 0.0, "Wbhitszbi": 431.0, "Tvid": 34526, "HitTime": "20180501", "ShortName": "二十四小时3", "Webid": 87, "WxMaxRead": null, "ListId": 13 }],//数据组
    pageIndex: 1,//页数
    date: "",//时间
    mindate: "",//最小时间
    maxdate: "",//最大时间
    changetime: '',
    time: "12:01",
    tokens: "sa",
    loading: false, // "上拉加载"的变量，默认false，隐藏 
    loaded: false, //“没有数据”的变量，默认false，隐藏 
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index: 0, //选择的下拉列表下标
    selected: true,
    selected1: false,
    select1: '',
    select2: '',
    shownavindex: '',
    content: [],
    listid:'6',
    chioceSorting: false,
    activeSortingName: "卫视两微榜",
    sortingChioceIcon: "/images/icon-go-black.png",
    dateChioceIcon: "/images/icon-go-black.png",
    content: [],
    nv: [],
    px: [],
    qyopen: false,
    qyshow: false,
    nzopen: false,
    pxopen: false,
    nzshow: false,
    pxshow: false,
    isfull: false,
    cityleft:'',
    citycenter: '',
    cityright: {},
    select1: '',
    select2: '',
    select3: '',
    shownavindex: '',
    bdname: '省级卫视综艺栏目两微榜',
  },
  listqy: function (e) {
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        nzopen: false,
        pxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        qyopen: true,
        pxopen: false,
        nzopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }

  },
  selectleft: function (e) {

    let ass = this.data.cityleft[0];
    let ddd = this.data.cityleft[0].TwoList;
    let ddds = e.currentTarget.dataset.city;
    this.setData({
      cityright: {},
      citycenter: this.data.cityleft[e.currentTarget.dataset.city].TwoList,
      select1: e.target.dataset.city,
      select2: ''
    });
  },
  selectcenter: function (e) {
    let aaaaas = this.data.citycenter[e.currentTarget.dataset.city].ThreeList[0].TreeId;
    this.setData({
      cityright: this.data.citycenter[e.currentTarget.dataset.city].ThreeList,
      // cityright: this.data.citycenter[e.currentTarget.dataset.city],
      select2: e.target.dataset.city
    });
  },
  selectright: function (e) {
    let df = this.data.cityright[e.currentTarget.dataset.city].TreeId;
    let dfa = this.data.cityright[e.currentTarget.dataset.city].TreeTypeName;
    this.setData({
      listid: this.data.cityright[e.currentTarget.dataset.city].TreeId,
      bdname: this.data.cityright[e.currentTarget.dataset.city].TreeTypeName,
      select3: e.target.dataset.city
    });
    this.listqy();
    this.gainLoadingListData();
  },
  //条件选择
  choiceItem: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "2":
        if (this.data.chioceSorting) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-down-black.png",
            chioceDistrict: false,
            chioceSorting: true,
            chioceFilter: false,
          });
        }
        break;
    }
  },

  //综合排序
  selectSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      sortingChioceIcon: "/images/icon-go-black.png",
      chioceSorting: false,
      listid: this.data.sortingList[index].key,
      activeSortingName: this.data.sortingList[index].value,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    });
    this.gainLoadingListData();
  },

  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  //获取参数token
  GetToken: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    let date = that.data.date;
    let ddd = util.formatTimestring(new Date())
    wx.request({
      url: 'https://shuxidata.com/zd/Home/GetAppToken',
      data: { appId: '687D7C5DD80E4F0588D5FC2327DE248A' },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data.Data != null) {
          let md = util.md5(res.data.Data + ddd);
          that.setData({
            tokens: md,
          });
        }
       
      },
      fail: function () {
      },
      complete: function () {

      }
    })
  },
  //上拉加载调用数据
  LoadList: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    let date = that.data.date;
    let webid = that.data.currentTab;
    let listid = that.data.listid;
    let tokens = that.data.tokens;
    wx.request({
      url: 'https://shuxidata.com/zd/ZD_WxAndWbLists/GetCommonListDatas',
      data: {
        listid: listid, typeid: '1', time: date, webid: webid, pageindex: pageIndex, pagesize: '20', lanmuname: '', appId:
        '687D7C5DD80E4F0588D5FC2327DE248A', token: tokens
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {

        var ite = that.data.listData;
        if (res.data.Data == null)//token过期了
        {
          that.GetToken(); //重新取一遍token
          that.LoadList();
        } else {
          if (res.data.Data.datalist.length != 0) {
            for (var i = 0; i < res.data.Data.datalist.length; i++) {
              ite.push(res.data.Data.datalist[i]);
            }
            that.setData({
              listData: ite,
              loading: true,
            });
          } else { // 数组为空
            that.setData({
              loading: false,  //把"上拉加载"的变量设为true，隐藏
              loaded: true,  //把"上拉加载完成"的变量设为false，显示
            })
          }
        }
      },
      fail: function () {

      },
      complete: function () {
      }
    })
  },
  //下拉刷新或者第一次加载数据
  gainLoadingListData: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    let date = that.data.date;
    let webid = that.data.currentTab;
    let listid = that.data.listid;
    let tokens = that.data.tokens;
    wx.request({
      url: 'https://shuxidata.com/zd/ZD_WxAndWbLists/GetCommonListDatas',
      data: {
        listid: listid, typeid: '1', time: date, webid: webid, pageindex: pageIndex, pagesize: '20', lanmuname: '', appId:
        '687D7C5DD80E4F0588D5FC2327DE248A', token: '5242418cab139804d08ef97c0f83cd4c'
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
       // if (res.data.Data == null)//token过期了
       //{
       //   that.GetToken(); //重新取一遍token
       //   that.gainLoadingListData();
       // } else {
        that.setData({ listData: listData.data.Data.datalist, loaded: false });
       // }
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },

  //下拉选项数据
  getCheckData: function () {
    var that = this;
    let tokens = that.data.tokens;
    wx.request({
      url: 'https://shuxidata.com/zd/ZD_CommonListNames/AppGetAllCommonListType',
      data: { appId: '687D7C5DD80E4F0588D5FC2327DE248A', token: tokens},
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data.Data == null)//token过期了
        {
          that.GetToken(); //重新取一遍token
          that.getCheckData();
        } else {
          that.setData({ cityleft: res.data.Data });
        }
      },
      fail: function () {

      },
      complete: function () {

      }
    })

  },


  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    let that = this;
    let currentTab = that.data.currentTab;
    that.setData({
      pageIndex: 1,
    })
    if (currentTab == 87) {
      this.gainLoadingListData();
    }
    else if (currentTab == 88) {

      this.gainLoadingListData();
    }
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //上拉加载
  onReachBottom: function () {
    let that = this;
    let currentTab = that.data.currentTab;
    wx.showLoading({
      title: '正在加载',
    })
    that.setData({

      loading: true,
      pageIndex: that.data.pageIndex + 1,
    })
    if (currentTab == 87) {
      this.LoadList();
    }
    else if (currentTab == 88) {

      this.LoadList();
    }
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)

  },
  //初始
  onLoad: function () {
    var that = this;
    let pageIndex = that.data.pageIndex;
    
    var time = util.formatTimes(new Date());
    var checktime = util.formatTimecheck(new Date());
    this.setData({
      maxdate: time,
      date: checktime
    });
    var time = util.formatTimemin(new Date());
    this.setData({
      mindate: time
    });
   // that.getCheckData();
   // that.gainLoadingListData();
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    var time = util.formatTimes(new Date());
    // this.setData({
    //  date: time
    //});
    // var time = util.formatTimemin(new Date());
    // this.setData({
    //   mindate: time
    //});
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        pageIndex: 1,
        currentTab: e.target.dataset.current
      })
    }
    let currentTab = that.data.currentTab;
    
    wx.showLoading({
      title: '正在拼命加载',
    })
    that.setData({

      loading: true,
    })
   

    if (currentTab == 87) {
      this.setData({
        sortingChioceIcon: "/images/icon-go-black.png",
        chioceSorting: false,
        selected1: false,
        selected: true
      })
       this.gainLoadingListData();
    }
    else if (currentTab == 88) {
      this.setData({
        sortingChioceIcon: "/images/icon-go-black.png",
        chioceSorting: false,
        selected: false,
        selected1: true
      })
     this.gainLoadingListData();
    }
    setTimeout(function () {
      wx.hideLoading()
    }, 500)

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  //时间改变
  bindDateChange: function (e) {
    this.setData({
      pageIndex: 1,
      date: e.detail.value,
    
    })
    let currentTab = this.data.currentTab;
    if (currentTab == 87) {
      this.gainLoadingListData();
    }
    else if (currentTab == 88) {
      this.gainLoadingListData();
    }
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.time,
    })

  },
})

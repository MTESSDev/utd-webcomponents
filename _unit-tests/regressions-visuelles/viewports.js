const desktopData = {
    label: "desktop",
    width: 1920,
    height: 1080
}

const tabletData = {
    label: "tablet",
    width: 768,
    height: 1024
}

const phoneData = {
    label: "phone",
    width: 375,
    height: 812
}

const largePhoneData = {
    label: "largePhone",
    width: 524,
    height: 812
}

module.exports = {
    vDesktopData : desktopData,
    vTabletData : tabletData,
    vPhoneData : phoneData,
    vDefaults : [desktopData, tabletData, phoneData],
    vDesktopTablet : [desktopData, tabletData],
    vDesktopPhone : [desktopData, phoneData],
    vTabletPhone : [tabletData, phoneData],
    vDesktop : [desktopData],
    vTablet : [tabletData],
    vPhone : [phoneData],
    vLargePhone : [largePhoneData]
};

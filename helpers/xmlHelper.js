
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var builder = new xml2js.Builder();
var i=0;
var XmlHelper = {
    createNew: function (xmlName, productName, productVersion, productPlatform) {
        
        XmlHelper.jsToXmlFile(xmlName, { project: { $: { name: productName, version: productVersion, platform: productPlatform} } });
    },
    addNode: function (xmlName, node, attribs) {

        jsonObj = XmlHelper.xmlFileToJs(xmlName);
        if(jsonObj["project"][node]===undefined) {
            jsonObj["project"][node]=[];
        };
        jsonObj["project"][node].push({$:attribs});
        XmlHelper.jsToXmlFile(xmlName, jsonObj);


    },
    xmlFileToJs: function (filename) {
        var filepath = path.normalize(path.join(__dirname, filename));
        var sync = true;
        var data = null;
        xml2js.parseString(fs.readFileSync(filepath, 'utf8'), {}, function (err, obj) {
            data = obj;
            sync = false;
        });

        while (sync) { require('deasync').sleep(100); }
        return data;

    },
    jsToXmlFile: function (filename, obj, cb) {
        var filepath = path.normalize(path.join(__dirname, filename));
        var xml = builder.buildObject(obj);
        fs.writeFileSync(filepath, xml);
    }
}


module.exports = XmlHelper;
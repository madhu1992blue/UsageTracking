var xmlHelper = require('../../helpers/xmlHelper');
var LogHandler= {
    createNew : function(productName, productVersion, platform){
        var xmlName = productName+"_"+productVersion+"_"+platform+".xml";
        console.log("Creating New XML:"+xmlName);
        xmlHelper.createNew(xmlName, productName, productVersion, platform);
        /*LogHandler.addStep(xmlName,{"name": productName, "version": productVersion, "platform":platform});
        LogHandler.addStep(xmlName,{"name": productName, "version": productVersion, "platform":platform});
        LogHandler.defineFeatureArea(xmlName,"fe","sa", "a");
        //LogHandler.defineFeatureArea(xmlName,"fe","sa", "a");
        LogHandler.addStepToFeatureArea(xmlName, "fe", "sa", "a",{name:"name"});*/
        return xmlName;
    },
    addStep: function(xmlName,attribs){
        xmlHelper.addNode(xmlName, "step", attribs);
        
    },
    defineFeatureArea: function(xmlName, featureName, subArea, version){
        xmlHelper.addNode(xmlName, "Feature", {name: featureName, subarea: subArea, version: version });
    },
    addStepToFeatureArea: function(xmlName, featureName, subArea, version, step){
        jsonObj = xmlHelper.xmlFileToJs(xmlName);
        featureAttribs = {name:featureName, subarea:subArea, version: version};
        if(jsonObj["project"]["Feature"]!==undefined){
            var count=0, isPresent = false;
            for(var Feature in jsonObj["project"]["Feature"]){
                var isValid=true;
                for( var attribute in featureAttribs){
                    
                    if(jsonObj["project"]["Feature"][count]['$'][attribute]!==featureAttribs[attribute]){
                        isValid = false;
                       
                    }
                   
                }
                if(isValid){
                    if(jsonObj["project"]["Feature"][count]["step"]==undefined)
                        jsonObj["project"]["Feature"][count]["step"]=[];
                    jsonObj["project"]["Feature"][count]["step"].push({$:step} );
                    xmlHelper.jsToXmlFile(xmlName, jsonObj);
                    isPresent = true;
                }
                count++;
            }
            if(!isPresent&&count==jsonObj["project"]["feature"].length){
                LogHandler.defineFeatureArea(xmlName, featureName, subArea, version);
                LogHandler.addStepToFeatureArea(xmlName, featureName, subArea, version, step);
            }
        }
        else{
                LogHandler.defineFeatureArea(xmlName, featureName, subArea, version);
                LogHandler.addStepToFeatureArea(xmlName, featureName, subArea, version, step);
        }
    }
}


module.exports = LogHandler;
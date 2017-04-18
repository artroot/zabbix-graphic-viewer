# zabbix-graphic-viewer
Module on JavaScriph which helps to display zabbix graphics and management it.
==========

## Add to your index ##
<link rel="stylesheet" type="text/css" href="css/graph.css">
<script type="text/javascript" src="js/graph_compress.js"></script>

## Example ##
<div id="graph_<Switch port or another identificator>"></div>
<script>
var data = {
        'port' : <Switch port or another identificator, div element id must be as this one>,
        'period' : <Zabbix graphic period in sec.>,
        'stime' : <Start display time, for example (YYYYMMDDHHmmss): 20170418214112>,
        'width' : <Width of graphic image>,
        'height' : <Height of graphic image>,
        'graphids' : [
          {
              'graphid' : <Zabbix graphic identificator>
          }
          ...
        ]
};

var graph = new Graphic(data);
graph.create();
</script>

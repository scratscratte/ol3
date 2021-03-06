goog.provide('ol.test.parser.ogc.WMSCapabilities_v1_1_1_WMSC');

describe('ol.parser.ogc.wmscapabilities_v1_1_1_wmsc', function() {

  var parser = new ol.parser.ogc.WMSCapabilities({
    profile: 'WMSC',
    allowFallback: true
  });

  describe('test read', function() {
    var obj, tilesets, tileset, url;
    url = 'spec/ol/parser/ogc/xml/wmscapabilities_v1_1_1_WMSC/wmsc.xml';
    goog.net.XhrIo.send(url, function(e) {
      var xhr = e.target;
      obj = parser.read(xhr.getResponseXml());
      tilesets = obj.capability.vendorSpecific.tileSets;
      tileset = tilesets[0];
    });
    it('We expect 2 tilesets to be parsed', function() {
      expect(tilesets.length).toEqual(2);
    });
    it('BBOX correctly parsed', function() {
      var bbox = [-13697515.466796875, 5165920.118906248,
          -13619243.94984375, 5244191.635859374];
      expect(tileset.bbox['EPSG:900913'].bbox).toEqual(bbox);
    });
    it('Format correctly parsed', function() {
      expect(tileset.format).toEqual('image/png');
    });
    it('Height correctly parsed', function() {
      expect(tileset.height).toEqual(256);
    });
    it('Width correctly parsed', function() {
      expect(tileset.width).toEqual(256);
    });
    it('Layers correctly parsed', function() {
      expect(tileset.layers).toEqual('medford:hydro');
    });
    it('SRS correctly parsed', function() {
      expect(tileset.srs['EPSG:900913']).toBeTruthy();
    });
    it('Resolutions correctly parsed', function() {
      var resolutions = [156543.03390625, 78271.516953125, 39135.7584765625,
          19567.87923828125, 9783.939619140625, 4891.9698095703125,
          2445.9849047851562, 1222.9924523925781, 611.4962261962891,
          305.74811309814453, 152.87405654907226, 76.43702827453613,
          38.218514137268066, 19.109257068634033, 9.554628534317017,
          4.777314267158508, 2.388657133579254, 1.194328566789627,
          0.5971642833948135, 0.29858214169740677, 0.14929107084870338,
          0.07464553542435169, 0.037322767712175846, 0.018661383856087923,
          0.009330691928043961, 0.004665345964021981];
      expect(tileset.resolutions).toEqual(resolutions);
    });
    it('Styles correctly parsed', function() {
      expect(tileset.styles).toEqual('');
    });
  });

  describe('test fallback', function() {
    var obj, url;
    url = 'spec/ol/parser/ogc/xml/wmscapabilities_v1_1_1_WMSC/fallback.xml';
    goog.net.XhrIo.send(url, function(e) {
      var xhr = e.target;
      obj = parser.read(xhr.getResponseXml());
    });
    it('layers parsed with allowFallback true', function() {
      expect(obj.capability.layers.length).toEqual(2);
    });
  });

});

goog.require('goog.net.XhrIo');
goog.require('ol.parser.ogc.WMSCapabilities');

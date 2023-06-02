/* eslint-disable no-inner-declarations */
import * as pegGrammar from "./pegjs/dist-sip/grammar";
/**
 * Grammar.
 * @internal
 */
export var Grammar;
(function (Grammar) {
  /**
   * Parse.
   * @param input -
   * @param startRule -
   */
  function parse(input, startRule) {
    const options = { startRule };
    try {
      pegGrammar.parse(input, options);
    } catch (e) {
      options.data = -1;
    }
    return options.data;
  }
  Grammar.parse = parse;
  /**
   * Parse the given string and returns a SIP.NameAddrHeader instance or undefined if
   * it is an invalid NameAddrHeader.
   * @param name_addr_header -
   */
  function nameAddrHeaderParse(nameAddrHeader) {
    const parsedNameAddrHeader = Grammar.parse(nameAddrHeader, "Name_Addr_Header");
    return parsedNameAddrHeader !== -1 ? parsedNameAddrHeader : undefined;
  }
  Grammar.nameAddrHeaderParse = nameAddrHeaderParse;
  /**
   * Parse the given string and returns a SIP.URI instance or undefined if
   * it is an invalid URI.
   * @param uri -
   */
  function URIParse(uri) {
    const parsedUri = Grammar.parse(uri, "SIP_URI");
    return parsedUri !== -1 ? parsedUri : undefined;
  }
  Grammar.URIParse = URIParse;
})(Grammar || (Grammar = {}));

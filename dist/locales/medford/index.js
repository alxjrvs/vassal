"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_flatten_1 = __importDefault(require("lodash.flatten"));
const const_1 = require("../../const");
const loadPage_1 = require("../../utils/loadPage");
// import { sleep } from '../../utils/sleep'
const toFile_1 = require("../../utils/toFile");
const fromFile_1 = require("../../utils/fromFile");
// import { batchPromise } from '../../utils/batchPromise'
const HOST = 'http://gis.vgsi.com/medfordma';
const BASE_URL = `${HOST}/Streets.aspx`;
// const sleepTimeout = 0
const streetPathSlug = 'Streets.aspx?Name=';
const addressPidSlug = 'Parcel.aspx?pid=';
let streetCount = 1;
let addressCount = 1;
const getStreetNames = () => __awaiter(void 0, void 0, void 0, function* () { return Promise.all(const_1.ALPHABET.map(getStreetNameMap)); });
const getStreetNameMap = (letter) => __awaiter(void 0, void 0, void 0, function* () {
    // sleep(sleepTimeout)
    const page = yield loadPage_1.loadPage(`${BASE_URL}?Letter=${letter}`);
    const paths = page(`a[href*='${streetPathSlug}']`)
        .toArray()
        .map(e => page(e).text());
    console.log(`Getting streets by letter - Letter ${letter}`);
    return paths;
});
const getAddressPids = (streetNames) => __awaiter(void 0, void 0, void 0, function* () { return Promise.all(streetNames.map(getAddressPidsMap)); });
const getAddressPidsMap = (streetPath) => __awaiter(void 0, void 0, void 0, function* () {
    // sleep(sleepTimeout)
    const page = yield loadPage_1.loadPage(`${HOST}/Streets.aspx?Name=${encodeURIComponent(streetPath)}`);
    const paths = page(`a[href*='${addressPidSlug}']`)
        .toArray()
        .map(e => Number(e.attribs.href.replace(addressPidSlug, '')));
    console.log(`Getting Street #${streetCount++}`);
    return paths;
});
const getAddressData = (addressPids) => __awaiter(void 0, void 0, void 0, function* () { return Promise.all(addressPids.map(getAddressDataMap)); });
// batchPromise({ list: addressPids.map(getAddressDataMap) })
const getAddressDataMap = (addressPid) => __awaiter(void 0, void 0, void 0, function* () {
    // sleep(sleepTimeout)
    const page = yield loadPage_1.loadPage(`${HOST}/Parcel.aspx?pid=${addressPid}`);
    console.log(`loaded address pid #${addressPid}, count #${addressCount++}`);
    return page.html;
});
const buildStreetNameCache = () => __awaiter(void 0, void 0, void 0, function* () {
    const streetNames = lodash_flatten_1.default(yield getStreetNames());
    toFile_1.toFile('medford/STREET_NAMES', JSON.stringify(streetNames));
});
const buildAddressPidText = () => __awaiter(void 0, void 0, void 0, function* () {
    const cachedStreetNames = fromFile_1.fromFile('medford/STREET_NAMES');
    const addressPids = lodash_flatten_1.default(yield getAddressPids(cachedStreetNames));
    toFile_1.toFile('medford/PIDS', JSON.stringify(addressPids));
});
const buildCache = () => __awaiter(void 0, void 0, void 0, function* () {
    yield buildStreetNameCache();
    yield buildAddressPidText();
});
const parse = () => __awaiter(void 0, void 0, void 0, function* () {
    const addresPids = yield fromFile_1.fromFile('medford/PIDS');
    const addressData = lodash_flatten_1.default(yield getAddressData(addresPids));
    console.log('LETS A GO: ' + addressData.length);
    return addressData;
});
const parseSingleAddress = (pid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getAddressDataMap(pid);
});
exports.Medford = {
    parse,
    parseSingleAddress,
    buildCache,
};
//# sourceMappingURL=index.js.map
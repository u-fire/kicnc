import { writable } from 'svelte/store';
export const project_dir = writable('');
export const mask_gerber_file = writable('');
export const paste_gerber_file = writable('');
export const make_disabled = writable(true);

export const millproject = writable({
    files: {
        'front': '',
        'back': '',
        'outline': '',
        'drill': '',
    },
    common: {
        'zsafe' : 5,
        'zchange' : 15,
        'zero-start': false,
        'x-offset': null,
        'y-offset': null,
        'tile-x': null,
        'tile-y': null,
        'metric': true
    },
    milling: {
        'zwork': -0.15,
        'mill-feed': 50,
        'mill-speed': 10000,
        'mill-diameters': '',
        'milling-overlap': '',
        'voronoi': false,
        'front-output': '',
        'back-output': '',
        'invert-gerbers': false,
        'isolation-width': 1
    },
    outline: {
        'cutter-diameter': 1.0,
        'zcut': -1.8,
        'cut-feed': 50,
        'cut-vertfeed': 100,
        'cut-speed': 10000,
        'cut-infeed': 0.3,
        'cut-side': '',
        'bridges': null,
        'bridgesnum': null,
        'zbridges': null,
        'outline-output': ''
    },
    drill: {
        'drill-side': '',
        'zdrill': -1.8,
        'drill-feed': 50,
        'drill-speed': 10000,
        'drill-output': '',
        'drills-available': '',
        'milldrill': false,
        'milldrill-diameter': null,
        'milldrill-output': '',
    },
    stencil: {
        'stencil-mill-feed': 1000,
        'stencil-mill-speed': 10000,
        'stencil-mill-diameters': 0.1,
        'stencil-invert-gerbers': true,
        'stencil-front-output': 'stencil.nc',
        'stencil-milling-overlap': 0,
        'stencil-zwork': -0.1,
    },
    mask: {
        'mask-mill-feed': 1000,
        'mask-mill-speed': 10000,
        'mask-mill-diameters': 0.1,
        'mask-invert-gerbers': true,
        'mask-front-output': 'mask.nc',
        'mask-milling-overlap': 0,
        'mask-zwork': -0.1,
    }
});
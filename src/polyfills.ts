import 'zone.js';

(window as any).global = window;

import * as process from 'process';
(window as any).process = process;
(window as any)['global'] = window;
global.Buffer = global.Buffer || require('buffer').Buffer;


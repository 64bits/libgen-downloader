import {
    CategorySceneActionIDS,
    ResultsSceneActionIDS
} from './action-ids';

import { UITypes } from '../ui'

/* ******************************************* */
export const CategorySceneListings: UITypes.ComponentParams[] = [
    {
        title: 'libgen',
        value: 'libgen',
        actionID: CategorySceneActionIDS.LIBGEN,
        color: 'white',
        hovercolor: 'cyan'
    },

    {
        title: 'libgen/fiction',
        value: 'libgen/fiction',
        actionID: CategorySceneActionIDS.LIBGEN_FICTION,
        color: 'white',
        hovercolor: 'cyan'
    },

    {
        title: 'libgen/comics',
        value: 'libgen/comics',
        actionID: CategorySceneActionIDS.LIBGEN_COMICS,
        color: 'white',
        hovercolor: 'cyan'
    }
]


/* ******************************************* */
export const ResultsSceneListings: UITypes.ComponentParams[]  = [
    {
        title: 'See Details',
        value: '',
        actionID: ResultsSceneActionIDS.SEE_DETAILS,
        color: 'white',
        hovercolor: 'cyan'
    },

    {
        title: 'Download Directly',
        value: '',
        actionID: ResultsSceneActionIDS.DOWNLOAD_DIRECTLY,
        color: 'white',
        hovercolor: 'cyan'
    },

    {
        title: 'Add to Bulk Downloading Queue',
        value: '',
        actionID: ResultsSceneActionIDS.ADD_TO_BULK_DOWNLOADING_QUEUE,
        color: 'yellow',
        hovercolor: 'cyan'
    },

    {
        title: 'Turn Back to The List',
        value: '',
        actionID: ResultsSceneActionIDS.TURN_BACK_TO_THE_LIST,
        color: 'white',
        hovercolor: 'cyan'
    }
]

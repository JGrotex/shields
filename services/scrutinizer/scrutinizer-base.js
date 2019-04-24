'use strict'

const { BaseJsonService } = require('..')

module.exports = class ScrutinizerBase extends BaseJsonService {
  // https://scrutinizer-ci.com/docs/api/#repository-details
  async fetch({ schema, vcs, slug }) {
    return this._requestJson({
      schema,
      url: `https://scrutinizer-ci.com/api/repositories/${vcs}/${slug}`,
      errorMessages: {
        401: 'not authorized to access project',
        404: 'project not found',
      },
    })
  }

  transformBranch({ json, branch }) {
    if (!branch) {
      branch = json.default_branch
    }

    return branch
  }
}

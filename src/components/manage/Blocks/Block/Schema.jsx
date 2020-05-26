const Schema = {
  title: "Settings",
  fieldsets: [{
    id: 'default',
    title: "Default",
    fields: [
      'placeholder',
      'required',
      'fixed',
      'readOnly',
      ],
  }],
  properties: {
    placeholder: {
      title: "Placeholder",
      description: "A short hint that describes the expected value",
      type: 'string',
    },
    required: {
      title: "Required",
      description: "Block can be removed or not",
      type: 'boolean',
    },
    fixed: {
      title: "Fixed",
      description: "Block can be moved or not via drag&drop",
      type: 'boolean',
    },
    readOnly: {
      title: "Read-only",
      description: "Block can be edited",
      type: 'boolean',
    }
  },
  required: [],
}

export default Schema;
import { defineField, defineType } from 'sanity';

export const shipmentVideo = defineType({
  name: 'shipmentVideo',
  title: 'Sevkiyat Videosu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeId',
      title: "YouTube video ID",
      type: 'string',
      description: 'Örnek: https://www.youtube.com/watch?v=XXXX → XXXX',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shipmentDate',
      title: 'Sevkiyat tarihi',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', date: 'shipmentDate' },
    prepare({ title, date }) {
      return {
        title: title || 'Video',
        subtitle: date ? String(date) : '',
      };
    },
  },
  orderings: [
    {
      title: 'Tarih (yeni)',
      name: 'dateDesc',
      by: [{ field: 'shipmentDate', direction: 'desc' }],
    },
  ],
});

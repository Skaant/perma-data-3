# perma-data-3

## features

### contributor
you need the role `'contributor'` in order to interact with the contributor tools
*right now, it is possible to edit user.roles only by hand*

#### add plant

#### add extract

#### add data

## documentation

### data format

#### 'name'
```javascript
{
  ...data,
  lang: tags.en ? 'en' : tags.fr ? 'fr' : null, // mandatory
  main: tags.main ? true : null,
  value, // mandatory
  fragments: value.split(' ').filter(f => f.length >= 3)
    /* calculated,
      - only fragments longer than or equal to 3 matter
        (minimum plant search key is 3) */
}
```


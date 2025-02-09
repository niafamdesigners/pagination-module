DECLARE @totalCount int = (SELECT count(*) FROM contents WHERE deleted=0 and siteid=[system:site-id] and published=1 and presentinsite=0 and ISNULL(expiretime ,GETDATE()) >=GETDATE() and 
ISNULL(customdatetime ,GETDATE()) <=GETDATE() and (isnull(mainheadline, '') LIKE N'%[post:searchValue]%' or isnull('[post:searchValue]', '') = '')
  and ((customdatetime > CAST('[post:startDate]' AS DATE) or isnull('[post:startDate]', '') = '') and (customdatetime < CAST('[post:endDate]' AS DATE) or isnull('[post:endDate]', '') = '')))

DECLARE @page int , @from int , @length int;
SET @length = 10;
SET @page = (CASE WHEN ISNULL('[post:page]', '') = '' THEN 1 ELSE CAST('[post:page]' AS INT) END) - 1;
SET @from = @page * @length;
SELECT id, ISNULL(mainheadline,'') as mainheadline, dbo.fn_DateToShamsiDate3(customdatetime,'[system:site-lang]') as newsDate, '[post:search]' as searchval, @totalCount as cnt

FROM contents as t
WHERE  deleted=0 and siteid=[system:site-id] and published=1 and presentinsite=0 and ISNULL(expiretime ,GETDATE()) >=GETDATE() and 
ISNULL(customdatetime ,GETDATE()) <=GETDATE()
and (isnull(mainheadline, '') LIKE N'%[post:searchValue]%' or isnull('[post:searchValue]', '') = '')
and ((customdatetime > CAST('[post:startDate]' AS DATE) or isnull('[post:startDate]', '') = '') and (customdatetime < CAST('[post:endDate]' AS DATE) or isnull('[post:endDate]', '') = ''))

ORDER BY  customdatetime DESC
OFFSET @from ROWS  FETCH NEXT @length ROWS ONLY 





-- نمونه کد تکرار شونده
--<tr  data-cnt='[query-result:cnt]'><td>[query-result:id]</td><td>[query-result:mainheadline]</td><td>[query-result:newsDate]</td><td><a href='[short-link:[query-result:id]]'>[short-link:[query-result:id]]</a></td></tr>
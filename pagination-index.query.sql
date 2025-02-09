DECLARE @totalCount int = (SELECT count(*) FROM contents WHERE deleted=0 and siteid=[system:site-id] and published=1 and presentinsite=0 and ISNULL(expiretime ,GETDATE()) >=GETDATE() and 
ISNULL(customdatetime ,GETDATE()) <=GETDATE())

DECLARE @page int , @from int , @length int;
SET @length = 10;
SET @page = (CASE WHEN ISNULL('[get:page]', '') = '' THEN 1 ELSE CAST('[get:page]' AS INT) END) - 1;
SET @from = @page * @length;
SELECT id, ISNULL(mainheadline,'') as mainheadline, dbo.fn_DateToShamsiDate3(customdatetime,'[system:site-lang]') as newsDate
, @totalCount AS cnt

FROM contents as t
WHERE  deleted=0 and siteid=[system:site-id] and published=1 and presentinsite=0 and ISNULL(expiretime ,GETDATE()) >=GETDATE() and 
ISNULL(customdatetime ,GETDATE()) <=GETDATE()

ORDER BY  customdatetime DESC
OFFSET @from ROWS  FETCH NEXT @length ROWS ONLY 


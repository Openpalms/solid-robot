import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import cls from './ArticleList.module.scss'
import { Article } from 'entities/Article'
import { ArticleView } from 'entities/Article/model/types/types'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.LIST ? 9 : 3)
    .fill(0)
    .map((_, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, view = ArticleView.BLOCK, isLoading } = props

  if (isLoading) {
    return <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>{getSkeletons(view)}</div>
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem article={article} view={view} className={cls.card} key={article.id} />
  )

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  )
})

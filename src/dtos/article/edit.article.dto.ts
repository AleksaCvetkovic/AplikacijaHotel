export class EditArticleDto{
    name: string;
    categoryId: number;
    except: string;
    description: string;
    price: number;
    status: 'availeble' | 'not availeble';
    features: {
        featureId: number;
        value:string;
    }[] | null;
}

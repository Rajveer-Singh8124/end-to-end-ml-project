import os
import sys

from dataclasses import dataclass
from sklearn.ensemble import(
    AdaBoostRegressor,
    GradientBoostingRegressor,
    RandomForestRegressor,
    
)

from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor
from sklearn.tree import DecisionTreeRegressor
from xgboost import XGBRegressor
from catboost import CatBoostRegressor
from sklearn.metrics import r2_score

from src.exception import CustomException
from src.logger import logging
from src.utlis import save_object,evaluate_model

@dataclass
class ModelTrainerConfig:
    trained_model_file_path = os.path.join("artifacts","model.pkl")

class ModelTrainer:
    def __init__(self) :
        self.model_trainer_config = ModelTrainerConfig()

    def initiate_model_trainer(self,train_arr,test_arr):
        try:
            logging.info("split train and test input data")
            x_train,y_train,x_test,y_test = (
                train_arr[:,:-1],
                train_arr[:,-1],
                test_arr[:,:-1],
                test_arr[:,-1]
            )
            models = {
            "Linear Regression":LinearRegression(),
            "K-Neighbors Regressor":KNeighborsRegressor(),
            "Decision Tree Regressor":DecisionTreeRegressor(),
            "Random Forest Regressor":RandomForestRegressor(),
            "XGB Regressor":XGBRegressor(),
            "AdaBoost Regressor":AdaBoostRegressor(),
            "Gradient Boosting Regressor":GradientBoostingRegressor(),
            "CatBoost Regressor":CatBoostRegressor(verbose=False)
            }

            model_report:dict = evaluate_model(x_train=x_train,y_train=y_train,x_test=x_test,y_test=y_test,models=models)

            best_model_score = max(sorted(model_report.values()))

            best_model_name = list(model_report.keys())[list(model_report.values()).index(best_model_score)]    
            
            best_model = models[best_model_name]

            if best_model_score<0.6:
                raise CustomException("No best model found")

            logging.info(f"Best found model on both training and testing dataset is {best_model}")

            save_object(
                file_path=self.model_trainer_config.trained_model_file_path,
                obj=best_model
            )

            predicted = best_model.predict(x_test)
            r2__score = r2_score(y_test,predicted)

            return r2__score

        except Exception as e:
            raise CustomException(e,sys)

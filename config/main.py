import logging
import argparse
from core_engine import engine

def parse_arguments():
    parser = argparse.ArgumentParser(description='Core Engine Main Program')
    parser.add_argument('-c', '--config', help='Configuration file path', required=True)
    return parser.parse_args()

def main():
    args = parse_arguments()
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    try:
        engine.init(args.config)
        engine.run()
    except Exception as e:
        logging.error(f'An error occurred: {str(e)}')
        raise

if __name__ == '__main__':
    main()